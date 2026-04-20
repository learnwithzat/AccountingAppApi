import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BranchModel = runtime.Types.Result.DefaultSelection<Prisma.$BranchPayload>;
export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null;
    _min: BranchMinAggregateOutputType | null;
    _max: BranchMaxAggregateOutputType | null;
};
export type BranchMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    companyId: string | null;
    tenantId: string | null;
    createdAt: Date | null;
};
export type BranchMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    companyId: string | null;
    tenantId: string | null;
    createdAt: Date | null;
};
export type BranchCountAggregateOutputType = {
    id: number;
    name: number;
    companyId: number;
    tenantId: number;
    createdAt: number;
    _all: number;
};
export type BranchMinAggregateInputType = {
    id?: true;
    name?: true;
    companyId?: true;
    tenantId?: true;
    createdAt?: true;
};
export type BranchMaxAggregateInputType = {
    id?: true;
    name?: true;
    companyId?: true;
    tenantId?: true;
    createdAt?: true;
};
export type BranchCountAggregateInputType = {
    id?: true;
    name?: true;
    companyId?: true;
    tenantId?: true;
    createdAt?: true;
    _all?: true;
};
export type BranchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BranchWhereInput;
    orderBy?: Prisma.BranchOrderByWithRelationInput | Prisma.BranchOrderByWithRelationInput[];
    cursor?: Prisma.BranchWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BranchCountAggregateInputType;
    _min?: BranchMinAggregateInputType;
    _max?: BranchMaxAggregateInputType;
};
export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
    [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBranch[P]> : Prisma.GetScalarType<T[P], AggregateBranch[P]>;
};
export type BranchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BranchWhereInput;
    orderBy?: Prisma.BranchOrderByWithAggregationInput | Prisma.BranchOrderByWithAggregationInput[];
    by: Prisma.BranchScalarFieldEnum[] | Prisma.BranchScalarFieldEnum;
    having?: Prisma.BranchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BranchCountAggregateInputType | true;
    _min?: BranchMinAggregateInputType;
    _max?: BranchMaxAggregateInputType;
};
export type BranchGroupByOutputType = {
    id: string;
    name: string;
    companyId: string;
    tenantId: string;
    createdAt: Date;
    _count: BranchCountAggregateOutputType | null;
    _min: BranchMinAggregateOutputType | null;
    _max: BranchMaxAggregateOutputType | null;
};
export type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BranchGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BranchGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BranchGroupByOutputType[P]>;
}>>;
export type BranchWhereInput = {
    AND?: Prisma.BranchWhereInput | Prisma.BranchWhereInput[];
    OR?: Prisma.BranchWhereInput[];
    NOT?: Prisma.BranchWhereInput | Prisma.BranchWhereInput[];
    id?: Prisma.StringFilter<"Branch"> | string;
    name?: Prisma.StringFilter<"Branch"> | string;
    companyId?: Prisma.StringFilter<"Branch"> | string;
    tenantId?: Prisma.StringFilter<"Branch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Branch"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
};
export type BranchOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    tenant?: Prisma.TenantOrderByWithRelationInput;
};
export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    companyId_name?: Prisma.BranchCompanyIdNameCompoundUniqueInput;
    AND?: Prisma.BranchWhereInput | Prisma.BranchWhereInput[];
    OR?: Prisma.BranchWhereInput[];
    NOT?: Prisma.BranchWhereInput | Prisma.BranchWhereInput[];
    name?: Prisma.StringFilter<"Branch"> | string;
    companyId?: Prisma.StringFilter<"Branch"> | string;
    tenantId?: Prisma.StringFilter<"Branch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Branch"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
}, "id" | "companyId_name">;
export type BranchOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BranchCountOrderByAggregateInput;
    _max?: Prisma.BranchMaxOrderByAggregateInput;
    _min?: Prisma.BranchMinOrderByAggregateInput;
};
export type BranchScalarWhereWithAggregatesInput = {
    AND?: Prisma.BranchScalarWhereWithAggregatesInput | Prisma.BranchScalarWhereWithAggregatesInput[];
    OR?: Prisma.BranchScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BranchScalarWhereWithAggregatesInput | Prisma.BranchScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Branch"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Branch"> | string;
    companyId?: Prisma.StringWithAggregatesFilter<"Branch"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"Branch"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Branch"> | Date | string;
};
export type BranchCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutBranchesInput;
    tenant: Prisma.TenantCreateNestedOneWithoutBranchesInput;
};
export type BranchUncheckedCreateInput = {
    id?: string;
    name: string;
    companyId: string;
    tenantId: string;
    createdAt?: Date | string;
};
export type BranchUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutBranchesNestedInput;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBranchesNestedInput;
};
export type BranchUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchCreateManyInput = {
    id?: string;
    name: string;
    companyId: string;
    tenantId: string;
    createdAt?: Date | string;
};
export type BranchUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchListRelationFilter = {
    every?: Prisma.BranchWhereInput;
    some?: Prisma.BranchWhereInput;
    none?: Prisma.BranchWhereInput;
};
export type BranchOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BranchCompanyIdNameCompoundUniqueInput = {
    companyId: string;
    name: string;
};
export type BranchCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BranchMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BranchMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BranchCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput> | Prisma.BranchCreateWithoutTenantInput[] | Prisma.BranchUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutTenantInput | Prisma.BranchCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.BranchCreateManyTenantInputEnvelope;
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
};
export type BranchUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput> | Prisma.BranchCreateWithoutTenantInput[] | Prisma.BranchUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutTenantInput | Prisma.BranchCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.BranchCreateManyTenantInputEnvelope;
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
};
export type BranchUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput> | Prisma.BranchCreateWithoutTenantInput[] | Prisma.BranchUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutTenantInput | Prisma.BranchCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.BranchUpsertWithWhereUniqueWithoutTenantInput | Prisma.BranchUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.BranchCreateManyTenantInputEnvelope;
    set?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    disconnect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    delete?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    update?: Prisma.BranchUpdateWithWhereUniqueWithoutTenantInput | Prisma.BranchUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.BranchUpdateManyWithWhereWithoutTenantInput | Prisma.BranchUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
};
export type BranchUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput> | Prisma.BranchCreateWithoutTenantInput[] | Prisma.BranchUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutTenantInput | Prisma.BranchCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.BranchUpsertWithWhereUniqueWithoutTenantInput | Prisma.BranchUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.BranchCreateManyTenantInputEnvelope;
    set?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    disconnect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    delete?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    update?: Prisma.BranchUpdateWithWhereUniqueWithoutTenantInput | Prisma.BranchUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.BranchUpdateManyWithWhereWithoutTenantInput | Prisma.BranchUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
};
export type BranchCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput> | Prisma.BranchCreateWithoutCompanyInput[] | Prisma.BranchUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutCompanyInput | Prisma.BranchCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.BranchCreateManyCompanyInputEnvelope;
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
};
export type BranchUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput> | Prisma.BranchCreateWithoutCompanyInput[] | Prisma.BranchUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutCompanyInput | Prisma.BranchCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.BranchCreateManyCompanyInputEnvelope;
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
};
export type BranchUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput> | Prisma.BranchCreateWithoutCompanyInput[] | Prisma.BranchUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutCompanyInput | Prisma.BranchCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.BranchUpsertWithWhereUniqueWithoutCompanyInput | Prisma.BranchUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.BranchCreateManyCompanyInputEnvelope;
    set?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    disconnect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    delete?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    update?: Prisma.BranchUpdateWithWhereUniqueWithoutCompanyInput | Prisma.BranchUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.BranchUpdateManyWithWhereWithoutCompanyInput | Prisma.BranchUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
};
export type BranchUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput> | Prisma.BranchCreateWithoutCompanyInput[] | Prisma.BranchUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.BranchCreateOrConnectWithoutCompanyInput | Prisma.BranchCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.BranchUpsertWithWhereUniqueWithoutCompanyInput | Prisma.BranchUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.BranchCreateManyCompanyInputEnvelope;
    set?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    disconnect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    delete?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    connect?: Prisma.BranchWhereUniqueInput | Prisma.BranchWhereUniqueInput[];
    update?: Prisma.BranchUpdateWithWhereUniqueWithoutCompanyInput | Prisma.BranchUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.BranchUpdateManyWithWhereWithoutCompanyInput | Prisma.BranchUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
};
export type BranchCreateWithoutTenantInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutBranchesInput;
};
export type BranchUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    companyId: string;
    createdAt?: Date | string;
};
export type BranchCreateOrConnectWithoutTenantInput = {
    where: Prisma.BranchWhereUniqueInput;
    create: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput>;
};
export type BranchCreateManyTenantInputEnvelope = {
    data: Prisma.BranchCreateManyTenantInput | Prisma.BranchCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type BranchUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.BranchWhereUniqueInput;
    update: Prisma.XOR<Prisma.BranchUpdateWithoutTenantInput, Prisma.BranchUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.BranchCreateWithoutTenantInput, Prisma.BranchUncheckedCreateWithoutTenantInput>;
};
export type BranchUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.BranchWhereUniqueInput;
    data: Prisma.XOR<Prisma.BranchUpdateWithoutTenantInput, Prisma.BranchUncheckedUpdateWithoutTenantInput>;
};
export type BranchUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.BranchScalarWhereInput;
    data: Prisma.XOR<Prisma.BranchUpdateManyMutationInput, Prisma.BranchUncheckedUpdateManyWithoutTenantInput>;
};
export type BranchScalarWhereInput = {
    AND?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
    OR?: Prisma.BranchScalarWhereInput[];
    NOT?: Prisma.BranchScalarWhereInput | Prisma.BranchScalarWhereInput[];
    id?: Prisma.StringFilter<"Branch"> | string;
    name?: Prisma.StringFilter<"Branch"> | string;
    companyId?: Prisma.StringFilter<"Branch"> | string;
    tenantId?: Prisma.StringFilter<"Branch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Branch"> | Date | string;
};
export type BranchCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutBranchesInput;
};
export type BranchUncheckedCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    tenantId: string;
    createdAt?: Date | string;
};
export type BranchCreateOrConnectWithoutCompanyInput = {
    where: Prisma.BranchWhereUniqueInput;
    create: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput>;
};
export type BranchCreateManyCompanyInputEnvelope = {
    data: Prisma.BranchCreateManyCompanyInput | Prisma.BranchCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type BranchUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.BranchWhereUniqueInput;
    update: Prisma.XOR<Prisma.BranchUpdateWithoutCompanyInput, Prisma.BranchUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.BranchCreateWithoutCompanyInput, Prisma.BranchUncheckedCreateWithoutCompanyInput>;
};
export type BranchUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.BranchWhereUniqueInput;
    data: Prisma.XOR<Prisma.BranchUpdateWithoutCompanyInput, Prisma.BranchUncheckedUpdateWithoutCompanyInput>;
};
export type BranchUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.BranchScalarWhereInput;
    data: Prisma.XOR<Prisma.BranchUpdateManyMutationInput, Prisma.BranchUncheckedUpdateManyWithoutCompanyInput>;
};
export type BranchCreateManyTenantInput = {
    id?: string;
    name: string;
    companyId: string;
    createdAt?: Date | string;
};
export type BranchUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutBranchesNestedInput;
};
export type BranchUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchCreateManyCompanyInput = {
    id?: string;
    name: string;
    tenantId: string;
    createdAt?: Date | string;
};
export type BranchUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBranchesNestedInput;
};
export type BranchUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BranchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    companyId?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["branch"]>;
export type BranchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    companyId?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["branch"]>;
export type BranchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    companyId?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["branch"]>;
export type BranchSelectScalar = {
    id?: boolean;
    name?: boolean;
    companyId?: boolean;
    tenantId?: boolean;
    createdAt?: boolean;
};
export type BranchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "companyId" | "tenantId" | "createdAt", ExtArgs["result"]["branch"]>;
export type BranchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type BranchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type BranchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $BranchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Branch";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        tenant: Prisma.$TenantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        companyId: string;
        tenantId: string;
        createdAt: Date;
    }, ExtArgs["result"]["branch"]>;
    composites: {};
};
export type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BranchPayload, S>;
export type BranchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BranchCountAggregateInputType | true;
};
export interface BranchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Branch'];
        meta: {
            name: 'Branch';
        };
    };
    findUnique<T extends BranchFindUniqueArgs>(args: Prisma.SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BranchFindFirstArgs>(args?: Prisma.SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BranchFindManyArgs>(args?: Prisma.SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BranchCreateArgs>(args: Prisma.SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BranchCreateManyArgs>(args?: Prisma.SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BranchDeleteArgs>(args: Prisma.SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BranchUpdateArgs>(args: Prisma.SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BranchDeleteManyArgs>(args?: Prisma.SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BranchUpdateManyArgs>(args: Prisma.SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BranchUpsertArgs>(args: Prisma.SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma.Prisma__BranchClient<runtime.Types.Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BranchCountArgs>(args?: Prisma.Subset<T, BranchCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BranchCountAggregateOutputType> : number>;
    aggregate<T extends BranchAggregateArgs>(args: Prisma.Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>;
    groupBy<T extends BranchGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BranchGroupByArgs['orderBy'];
    } : {
        orderBy?: BranchGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BranchFieldRefs;
}
export interface Prisma__BranchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BranchFieldRefs {
    readonly id: Prisma.FieldRef<"Branch", 'String'>;
    readonly name: Prisma.FieldRef<"Branch", 'String'>;
    readonly companyId: Prisma.FieldRef<"Branch", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Branch", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Branch", 'DateTime'>;
}
export type BranchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    where: Prisma.BranchWhereUniqueInput;
};
export type BranchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    where: Prisma.BranchWhereUniqueInput;
};
export type BranchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BranchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BranchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BranchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BranchCreateInput, Prisma.BranchUncheckedCreateInput>;
};
export type BranchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BranchCreateManyInput | Prisma.BranchCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BranchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    data: Prisma.BranchCreateManyInput | Prisma.BranchCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BranchIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BranchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BranchUpdateInput, Prisma.BranchUncheckedUpdateInput>;
    where: Prisma.BranchWhereUniqueInput;
};
export type BranchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BranchUpdateManyMutationInput, Prisma.BranchUncheckedUpdateManyInput>;
    where?: Prisma.BranchWhereInput;
    limit?: number;
};
export type BranchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BranchUpdateManyMutationInput, Prisma.BranchUncheckedUpdateManyInput>;
    where?: Prisma.BranchWhereInput;
    limit?: number;
    include?: Prisma.BranchIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BranchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    where: Prisma.BranchWhereUniqueInput;
    create: Prisma.XOR<Prisma.BranchCreateInput, Prisma.BranchUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BranchUpdateInput, Prisma.BranchUncheckedUpdateInput>;
};
export type BranchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
    where: Prisma.BranchWhereUniqueInput;
};
export type BranchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BranchWhereInput;
    limit?: number;
};
export type BranchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BranchSelect<ExtArgs> | null;
    omit?: Prisma.BranchOmit<ExtArgs> | null;
    include?: Prisma.BranchInclude<ExtArgs> | null;
};
