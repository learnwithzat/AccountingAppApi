/** @format */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateDocumentDto, UpdateDocumentDto } from './document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE DOCUMENT
  //////////////////////////////////////////////////////
  async create(dto: CreateDocumentDto, tenantId: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      //////////////////////////////////////////////////////
      // CHECK TENANT
      //////////////////////////////////////////////////////
      const tenant = await tx.tenant.findUnique({
        where: { id: tenantId },
      });

      if (!tenant) throw new NotFoundException('Tenant not found');

      //////////////////////////////////////////////////////
      // CHECK COMPANY (optional)
      //////////////////////////////////////////////////////
      if (dto.companyId) {
        const company = await tx.company.findFirst({
          where: {
            id: dto.companyId,
            tenantId,
          },
        });

        if (!company) throw new NotFoundException('Company not found');
      }

      //////////////////////////////////////////////////////
      // CHECK BRANCH (optional)
      //////////////////////////////////////////////////////
      if (dto.branchId) {
        const branch = await tx.branch.findFirst({
          where: {
            id: dto.branchId,
            tenantId,
          },
        });
        if (!branch) throw new NotFoundException('Branch not found');
      }

      //////////////////////////////////////////////////////
      // DUPLICATE CHECK
      //////////////////////////////////////////////////////
      const exists = await tx.document.findFirst({
        where: {
          tenantId,
          name: dto.name,
          ownerId: dto.ownerId,
          ownerType: dto.ownerType,
        },
      });

      if (exists) {
        throw new ConflictException('Document already exists for this owner');
      }

      //////////////////////////////////////////////////////
      // CREATE DOCUMENT (SAFE MAPPING)
      //////////////////////////////////////////////////////
      return tx.document.create({
        data: {
          name: dto.name,
          type: dto.type,

          expiryDate: new Date(dto.expiryDate),
          issueDate: dto.issueDate ? new Date(dto.issueDate) : null,

          notes: dto.notes ?? null,

          ownerType: dto.ownerType,
          ownerId: dto.ownerId,

          companyId: dto.companyId ?? null,
          branchId: dto.branchId ?? null,

          tenantId,
          createdById: userId,
        },
        include: {
          company: true,
          branch: true,
          createdBy: {
            select: { id: true, name: true },
          },
        },
      });
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL DOCUMENTS (FILTER + SEARCH)
  //////////////////////////////////////////////////////
  async findAll(tenantId: string, query: any) {
    const { search, status, type } = query;

    return this.prisma.document.findMany({
      where: {
        tenantId,

        ...(status && { status }),
        ...(type && { type }),

        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              ownerType: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              ownerId: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }),
      },

      include: {
        company: {
          select: { id: true, name: true },
        },
        branch: {
          select: { id: true, name: true },
        },
        createdBy: {
          select: { id: true, name: true },
        },
      },

      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET ONE DOCUMENT
  //////////////////////////////////////////////////////
  async findOne(id: string, tenantId: string) {
    const doc = await this.prisma.document.findFirst({
      where: {
        id,
        tenantId,
      },
      include: {
        company: true,
        branch: true,
        createdBy: true,
      },
    });

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  //////////////////////////////////////////////////////
  // UPDATE DOCUMENT (SAFE PATCH STYLE)
  //////////////////////////////////////////////////////
  async update(id: string, dto: UpdateDocumentDto, tenantId: string) {
    return this.prisma.$transaction(async (tx) => {
      //////////////////////////////////////////////////////
      // CHECK EXISTENCE
      //////////////////////////////////////////////////////
      const doc = await tx.document.findFirst({
        where: {
          id,
          tenantId,
        },
      });

      if (!doc) {
        throw new NotFoundException('Document not found');
      }

      //////////////////////////////////////////////////////
      // UPDATE (SAFE FIELD PATCHING)
      //////////////////////////////////////////////////////
      return tx.document.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.type && { type: dto.type }),

          ...(dto.expiryDate && {
            expiryDate: new Date(dto.expiryDate),
          }),

          ...(dto.issueDate !== undefined && {
            issueDate: dto.issueDate ? new Date(dto.issueDate) : null,
          }),

          ...(dto.notes !== undefined && { notes: dto.notes }),

          ...(dto.ownerType && { ownerType: dto.ownerType }),
          ...(dto.ownerId && { ownerId: dto.ownerId }),

          ...(dto.companyId !== undefined && {
            companyId: dto.companyId,
          }),

          ...(dto.branchId !== undefined && {
            branchId: dto.branchId,
          }),
        },
        include: {
          company: true,
          branch: true,
          createdBy: true,
        },
      });
    });
  }

  //////////////////////////////////////////////////////
  // DELETE DOCUMENT
  //////////////////////////////////////////////////////
  async remove(id: string, tenantId: string) {
    return this.prisma.$transaction(async (tx) => {
      const doc = await tx.document.findFirst({
        where: {
          id,
          tenantId,
        },
      });

      if (!doc) {
        throw new NotFoundException('Document not found');
      }

      return tx.document.delete({
        where: { id },
      });
    });
  }
}
