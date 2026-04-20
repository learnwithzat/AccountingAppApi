import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CompanyModel = runtime.Types.Result.DefaultSelection<Prisma.$CompanyPayload>;
export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null;
    _min: CompanyMinAggregateOutputType | null;
    _max: CompanyMaxAggregateOutputType | null;
};
export type CompanyMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    tenantId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    tenantId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyCountAggregateOutputType = {
    id: number;
    name: number;
    tenantId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CompanyMinAggregateInputType = {
    id?: true;
    name?: true;
    tenantId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyMaxAggregateInputType = {
    id?: true;
    name?: true;
    tenantId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyCountAggregateInputType = {
    id?: true;
    name?: true;
    tenantId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CompanyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CompanyCountAggregateInputType;
    _min?: CompanyMinAggregateInputType;
    _max?: CompanyMaxAggregateInputType;
};
export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
    [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompany[P]> : Prisma.GetScalarType<T[P], AggregateCompany[P]>;
};
export type CompanyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithAggregationInput | Prisma.CompanyOrderByWithAggregationInput[];
    by: Prisma.CompanyScalarFieldEnum[] | Prisma.CompanyScalarFieldEnum;
    having?: Prisma.CompanyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompanyCountAggregateInputType | true;
    _min?: CompanyMinAggregateInputType;
    _max?: CompanyMaxAggregateInputType;
};
export type CompanyGroupByOutputType = {
    id: string;
    name: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CompanyCountAggregateOutputType | null;
    _min: CompanyMinAggregateOutputType | null;
    _max: CompanyMaxAggregateOutputType | null;
};
export type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CompanyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CompanyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CompanyGroupByOutputType[P]>;
}>>;
export type CompanyWhereInput = {
    AND?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    OR?: Prisma.CompanyWhereInput[];
    NOT?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    id?: Prisma.StringFilter<"Company"> | string;
    name?: Prisma.StringFilter<"Company"> | string;
    tenantId?: Prisma.StringFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    branches?: Prisma.BranchListRelationFilter;
};
export type CompanyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    branches?: Prisma.BranchOrderByRelationAggregateInput;
};
export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_name?: Prisma.CompanyTenantIdNameCompoundUniqueInput;
    AND?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    OR?: Prisma.CompanyWhereInput[];
    NOT?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    name?: Prisma.StringFilter<"Company"> | string;
    tenantId?: Prisma.StringFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    branches?: Prisma.BranchListRelationFilter;
}, "id" | "tenantId_name">;
export type CompanyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CompanyCountOrderByAggregateInput;
    _max?: Prisma.CompanyMaxOrderByAggregateInput;
    _min?: Prisma.CompanyMinOrderByAggregateInput;
};
export type CompanyScalarWhereWithAggregatesInput = {
    AND?: Prisma.CompanyScalarWhereWithAggregatesInput | Prisma.CompanyScalarWhereWithAggregatesInput[];
    OR?: Prisma.CompanyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CompanyScalarWhereWithAggregatesInput | Prisma.CompanyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Company"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Company"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Company"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Company"> | Date | string;
};
export type CompanyCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutCompaniesInput;
    branches?: Prisma.BranchCreateNestedManyWithoutCompanyInput;
};
export type CompanyUncheckedCreateInput = {
    id?: string;
    name: string;
    tenantId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    branches?: Prisma.BranchUncheckedCreateNestedManyWithoutCompanyInput;
};
export type CompanyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutCompaniesNestedInput;
    branches?: Prisma.BranchUpdateManyWithoutCompanyNestedInput;
};
export type CompanyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    branches?: Prisma.BranchUncheckedUpdateManyWithoutCompanyNestedInput;
};
export type CompanyCreateManyInput = {
    id?: string;
    name: string;
    tenantId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyListRelationFilter = {
    every?: Prisma.CompanyWhereInput;
    some?: Prisma.CompanyWhereInput;
    none?: Prisma.CompanyWhereInput;
};
export type CompanyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CompanyTenantIdNameCompoundUniqueInput = {
    tenantId: string;
    name: string;
};
export type CompanyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyScalarRelationFilter = {
    is?: Prisma.CompanyWhereInput;
    isNot?: Prisma.CompanyWhereInput;
};
export type CompanyCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput> | Prisma.CompanyCreateWithoutTenantInput[] | Prisma.CompanyUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutTenantInput | Prisma.CompanyCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.CompanyCreateManyTenantInputEnvelope;
    connect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
};
export type CompanyUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput> | Prisma.CompanyCreateWithoutTenantInput[] | Prisma.CompanyUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutTenantInput | Prisma.CompanyCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.CompanyCreateManyTenantInputEnvelope;
    connect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
};
export type CompanyUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput> | Prisma.CompanyCreateWithoutTenantInput[] | Prisma.CompanyUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutTenantInput | Prisma.CompanyCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.CompanyUpsertWithWhereUniqueWithoutTenantInput | Prisma.CompanyUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.CompanyCreateManyTenantInputEnvelope;
    set?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    disconnect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    delete?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    connect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    update?: Prisma.CompanyUpdateWithWhereUniqueWithoutTenantInput | Prisma.CompanyUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.CompanyUpdateManyWithWhereWithoutTenantInput | Prisma.CompanyUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.CompanyScalarWhereInput | Prisma.CompanyScalarWhereInput[];
};
export type CompanyUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput> | Prisma.CompanyCreateWithoutTenantInput[] | Prisma.CompanyUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutTenantInput | Prisma.CompanyCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.CompanyUpsertWithWhereUniqueWithoutTenantInput | Prisma.CompanyUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.CompanyCreateManyTenantInputEnvelope;
    set?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    disconnect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    delete?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    connect?: Prisma.CompanyWhereUniqueInput | Prisma.CompanyWhereUniqueInput[];
    update?: Prisma.CompanyUpdateWithWhereUniqueWithoutTenantInput | Prisma.CompanyUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.CompanyUpdateManyWithWhereWithoutTenantInput | Prisma.CompanyUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.CompanyScalarWhereInput | Prisma.CompanyScalarWhereInput[];
};
export type CompanyCreateNestedOneWithoutBranchesInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutBranchesInput, Prisma.CompanyUncheckedCreateWithoutBranchesInput>;
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutBranchesInput;
    connect?: Prisma.CompanyWhereUniqueInput;
};
export type CompanyUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutBranchesInput, Prisma.CompanyUncheckedCreateWithoutBranchesInput>;
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutBranchesInput;
    upsert?: Prisma.CompanyUpsertWithoutBranchesInput;
    connect?: Prisma.CompanyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CompanyUpdateToOneWithWhereWithoutBranchesInput, Prisma.CompanyUpdateWithoutBranchesInput>, Prisma.CompanyUncheckedUpdateWithoutBranchesInput>;
};
export type CompanyCreateWithoutTenantInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    branches?: Prisma.BranchCreateNestedManyWithoutCompanyInput;
};
export type CompanyUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    branches?: Prisma.BranchUncheckedCreateNestedManyWithoutCompanyInput;
};
export type CompanyCreateOrConnectWithoutTenantInput = {
    where: Prisma.CompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput>;
};
export type CompanyCreateManyTenantInputEnvelope = {
    data: Prisma.CompanyCreateManyTenantInput | Prisma.CompanyCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type CompanyUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.CompanyWhereUniqueInput;
    update: Prisma.XOR<Prisma.CompanyUpdateWithoutTenantInput, Prisma.CompanyUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutTenantInput, Prisma.CompanyUncheckedCreateWithoutTenantInput>;
};
export type CompanyUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.XOR<Prisma.CompanyUpdateWithoutTenantInput, Prisma.CompanyUncheckedUpdateWithoutTenantInput>;
};
export type CompanyUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.CompanyScalarWhereInput;
    data: Prisma.XOR<Prisma.CompanyUpdateManyMutationInput, Prisma.CompanyUncheckedUpdateManyWithoutTenantInput>;
};
export type CompanyScalarWhereInput = {
    AND?: Prisma.CompanyScalarWhereInput | Prisma.CompanyScalarWhereInput[];
    OR?: Prisma.CompanyScalarWhereInput[];
    NOT?: Prisma.CompanyScalarWhereInput | Prisma.CompanyScalarWhereInput[];
    id?: Prisma.StringFilter<"Company"> | string;
    name?: Prisma.StringFilter<"Company"> | string;
    tenantId?: Prisma.StringFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
};
export type CompanyCreateWithoutBranchesInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutCompaniesInput;
};
export type CompanyUncheckedCreateWithoutBranchesInput = {
    id?: string;
    name: string;
    tenantId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyCreateOrConnectWithoutBranchesInput = {
    where: Prisma.CompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutBranchesInput, Prisma.CompanyUncheckedCreateWithoutBranchesInput>;
};
export type CompanyUpsertWithoutBranchesInput = {
    update: Prisma.XOR<Prisma.CompanyUpdateWithoutBranchesInput, Prisma.CompanyUncheckedUpdateWithoutBranchesInput>;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutBranchesInput, Prisma.CompanyUncheckedCreateWithoutBranchesInput>;
    where?: Prisma.CompanyWhereInput;
};
export type CompanyUpdateToOneWithWhereWithoutBranchesInput = {
    where?: Prisma.CompanyWhereInput;
    data: Prisma.XOR<Prisma.CompanyUpdateWithoutBranchesInput, Prisma.CompanyUncheckedUpdateWithoutBranchesInput>;
};
export type CompanyUpdateWithoutBranchesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutCompaniesNestedInput;
};
export type CompanyUncheckedUpdateWithoutBranchesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyCreateManyTenantInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    branches?: Prisma.BranchUpdateManyWithoutCompanyNestedInput;
};
export type CompanyUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    branches?: Prisma.BranchUncheckedUpdateManyWithoutCompanyNestedInput;
};
export type CompanyUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyCountOutputType = {
    branches: number;
};
export type CompanyCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    branches?: boolean | CompanyCountOutputTypeCountBranchesArgs;
};
export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyCountOutputTypeSelect<ExtArgs> | null;
};
export type CompanyCountOutputTypeCountBranchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BranchWhereInput;
};
export type CompanySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    branches?: boolean | Prisma.Company$branchesArgs<ExtArgs>;
    _count?: boolean | Prisma.CompanyCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["company"]>;
export type CompanySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["company"]>;
export type CompanySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["company"]>;
export type CompanySelectScalar = {
    id?: boolean;
    name?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CompanyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>;
export type CompanyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    branches?: boolean | Prisma.Company$branchesArgs<ExtArgs>;
    _count?: boolean | Prisma.CompanyCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CompanyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $CompanyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Company";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        branches: Prisma.$BranchPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["company"]>;
    composites: {};
};
export type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CompanyPayload, S>;
export type CompanyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CompanyCountAggregateInputType | true;
};
export interface CompanyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Company'];
        meta: {
            name: 'Company';
        };
    };
    findUnique<T extends CompanyFindUniqueArgs>(args: Prisma.SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CompanyFindFirstArgs>(args?: Prisma.SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CompanyFindManyArgs>(args?: Prisma.SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CompanyCreateArgs>(args: Prisma.SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CompanyCreateManyArgs>(args?: Prisma.SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CompanyDeleteArgs>(args: Prisma.SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CompanyUpdateArgs>(args: Prisma.SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CompanyDeleteManyArgs>(args?: Prisma.SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CompanyUpdateManyArgs>(args: Prisma.SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CompanyUpsertArgs>(args: Prisma.SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CompanyCountArgs>(args?: Prisma.Subset<T, CompanyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CompanyCountAggregateOutputType> : number>;
    aggregate<T extends CompanyAggregateArgs>(args: Prisma.Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>;
    groupBy<T extends CompanyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CompanyGroupByArgs['orderBy'];
    } : {
        orderBy?: CompanyGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CompanyFieldRefs;
}
export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    branches<T extends Prisma.Company$branchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Company$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CompanyFieldRefs {
    readonly id: Prisma.FieldRef<"Company", 'String'>;
    readonly name: Prisma.FieldRef<"Company", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Company", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Company", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Company", 'DateTime'>;
}
export type CompanyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyCreateInput, Prisma.CompanyUncheckedCreateInput>;
};
export type CompanyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CompanyCreateManyInput | Prisma.CompanyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    data: Prisma.CompanyCreateManyInput | Prisma.CompanyCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CompanyIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CompanyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyUpdateInput, Prisma.CompanyUncheckedUpdateInput>;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CompanyUpdateManyMutationInput, Prisma.CompanyUncheckedUpdateManyInput>;
    where?: Prisma.CompanyWhereInput;
    limit?: number;
};
export type CompanyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyUpdateManyMutationInput, Prisma.CompanyUncheckedUpdateManyInput>;
    where?: Prisma.CompanyWhereInput;
    limit?: number;
    include?: Prisma.CompanyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CompanyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyCreateInput, Prisma.CompanyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CompanyUpdateInput, Prisma.CompanyUncheckedUpdateInput>;
};
export type CompanyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    limit?: number;
};
export type Company$branchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    where?: Prisma.BranchWhereInput;
    orderBy?: Prisma.BranchOrderByWithRelationInput | Prisma.BranchOrderByWithRelationInput[];
    cursor?: Prisma.BranchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BranchScalarFieldEnum | Prisma.BranchScalarFieldEnum[];
};
export type CompanyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
};
