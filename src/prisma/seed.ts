import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '../../prisma/generated/client';

const prisma = new PrismaService();

async function main() {
  console.log('🌱 Seeding started...');

  await prisma.$connect();

  console.log('🧹 Cleaning up database...');
  // Delete in reverse order of dependencies to respect foreign key constraints
  await prisma.rolePermission.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.role.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.company.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.plan.deleteMany();
  console.log('✅ Database cleaned');

  //////////////////////////////////////////////////////
  // 1. CREATE GLOBAL PERMISSIONS
  //////////////////////////////////////////////////////

  const permissions = [
    // Dashboard
    { key: 'dashboard.view', label: 'View Dashboard' },

    // Tenant
    { key: 'tenant.view', label: 'View Tenant' },
    { key: 'tenant.create', label: 'Create Tenant' },
    { key: 'tenant.update', label: 'Update Tenant' },
    { key: 'tenant.delete', label: 'Delete Tenant' },

    // User
    { key: 'user.view', label: 'View User' },
    { key: 'user.create', label: 'Create User' },
    { key: 'user.update', label: 'Update User' },
    { key: 'user.delete', label: 'Delete User' },

    // Role
    { key: 'role.view', label: 'View Role' },
    { key: 'role.create', label: 'Create Role' },
    { key: 'role.update', label: 'Update Role' },
    { key: 'role.delete', label: 'Delete Role' },

    // Company
    { key: 'company.view', label: 'View Company' },
    { key: 'company.manage', label: 'Manage Company' },

    // Branch
    { key: 'branch.view', label: 'View Branch' },
    { key: 'branch.manage', label: 'Manage Branch' },

    // Subscription
    { key: 'subscription.view', label: 'View Subscription' },
    { key: 'subscription.manage', label: 'Manage Subscription' },

    // Audit
    { key: 'audit.view', label: 'View Audit Logs' },
  ];

  const permissionMap = new Map<string, string>();

  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { key: p.key },
      update: { label: p.label },
      create: p,
    });

    permissionMap.set(p.key, perm.id);
  }

  console.log(`✅ Permissions seeded: ${permissions.length}`);

  //////////////////////////////////////////////////////
  // 2. CREATE SAMPLE TENANT (DEFAULT WORKSPACE)
  //////////////////////////////////////////////////////

  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: {
      name: 'Default Tenant',
      slug: 'default-tenant',
    },
  });

  console.log('✅ Tenant created');

  //////////////////////////////////////////////////////
  // 3. CREATE ROLES (TENANT SCOPED)
  //////////////////////////////////////////////////////

  const roles = [
    { name: 'Owner', type: RoleType.OWNER },
    { name: 'Admin', type: RoleType.ADMIN },
    { name: 'Manager', type: RoleType.MANAGER },
    { name: 'Staff', type: RoleType.STAFF },
  ];

  const roleMap = new Map<string, any>();

  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: {
        tenantId_name: {
          tenantId: tenant.id,
          name: r.name,
        },
      },
      update: {},
      create: {
        name: r.name,
        type: r.type,
        tenantId: tenant.id,
      },
    });

    roleMap.set(r.name, role);
  }

  console.log('✅ Roles seeded');

  //////////////////////////////////////////////////////
  // 4. ROLE → PERMISSION ASSIGNMENT
  //////////////////////////////////////////////////////

  const getPerm = (key: string) => permissionMap.get(key)!;

  // OWNER → ALL PERMISSIONS
  const ownerRole = roleMap.get('Owner');

  for (const p of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: ownerRole.id,
          permissionId: getPerm(p.key),
        },
      },
      update: {},
      create: {
        roleId: ownerRole.id,
        permissionId: getPerm(p.key),
      },
    });
  }

  // ADMIN → LIMITED ACCESS
  const adminPermissions = [
    'dashboard.view',
    'tenant.view',
    'user.view',
    'user.create',
    'user.update',
    'role.view',
    'company.view',
    'branch.view',
    'subscription.view',
  ];

  const adminRole = roleMap.get('Admin');

  for (const key of adminPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: getPerm(key),
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: getPerm(key),
      },
    });
  }

  // MANAGER → OPERATIONAL ACCESS
  const managerPermissions = [
    'dashboard.view',
    'user.view',
    'company.view',
    'branch.view',
  ];

  const managerRole = roleMap.get('Manager');

  for (const key of managerPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: managerRole.id,
          permissionId: getPerm(key),
        },
      },
      update: {},
      create: {
        roleId: managerRole.id,
        permissionId: getPerm(key),
      },
    });
  }

  // STAFF → BASIC ACCESS
  const staffPermissions = ['dashboard.view'];

  const staffRole = roleMap.get('Staff');

  for (const key of staffPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: staffRole.id,
          permissionId: getPerm(key),
        },
      },
      update: {},
      create: {
        roleId: staffRole.id,
        permissionId: getPerm(key),
      },
    });
  }

  console.log('✅ Role permissions mapped');

  //////////////////////////////////////////////////////
  // DONE
  //////////////////////////////////////////////////////

  console.log('🎉 Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
