import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Trip
 *
 */
export type TripModel = runtime.Types.Result.DefaultSelection<Prisma.$TripPayload>;
export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null;
    _avg: TripAvgAggregateOutputType | null;
    _sum: TripSumAggregateOutputType | null;
    _min: TripMinAggregateOutputType | null;
    _max: TripMaxAggregateOutputType | null;
};
export type TripAvgAggregateOutputType = {
    id: number | null;
};
export type TripSumAggregateOutputType = {
    id: bigint | null;
};
export type TripMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    start_time: Date | null;
    end_time: Date | null;
};
export type TripMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    start_time: Date | null;
    end_time: Date | null;
};
export type TripCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    start_time: number;
    end_time: number;
    _all: number;
};
export type TripAvgAggregateInputType = {
    id?: true;
};
export type TripSumAggregateInputType = {
    id?: true;
};
export type TripMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    start_time?: true;
    end_time?: true;
};
export type TripMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    start_time?: true;
    end_time?: true;
};
export type TripCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    start_time?: true;
    end_time?: true;
    _all?: true;
};
export type TripAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Trip to aggregate.
     */
    where?: Prisma.TripWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Trips to fetch.
     */
    orderBy?: Prisma.TripOrderByWithRelationInput | Prisma.TripOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.TripWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Trips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Trips
    **/
    _count?: true | TripCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: TripAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: TripSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType;
};
export type GetTripAggregateType<T extends TripAggregateArgs> = {
    [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrip[P]> : Prisma.GetScalarType<T[P], AggregateTrip[P]>;
};
export type TripGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TripWhereInput;
    orderBy?: Prisma.TripOrderByWithAggregationInput | Prisma.TripOrderByWithAggregationInput[];
    by: Prisma.TripScalarFieldEnum[] | Prisma.TripScalarFieldEnum;
    having?: Prisma.TripScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TripCountAggregateInputType | true;
    _avg?: TripAvgAggregateInputType;
    _sum?: TripSumAggregateInputType;
    _min?: TripMinAggregateInputType;
    _max?: TripMaxAggregateInputType;
};
export type TripGroupByOutputType = {
    id: bigint;
    name: string;
    description: string | null;
    start_time: Date;
    end_time: Date;
    _count: TripCountAggregateOutputType | null;
    _avg: TripAvgAggregateOutputType | null;
    _sum: TripSumAggregateOutputType | null;
    _min: TripMinAggregateOutputType | null;
    _max: TripMaxAggregateOutputType | null;
};
export type GetTripGroupByPayload<T extends TripGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TripGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TripGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TripGroupByOutputType[P]>;
}>>;
export type TripWhereInput = {
    AND?: Prisma.TripWhereInput | Prisma.TripWhereInput[];
    OR?: Prisma.TripWhereInput[];
    NOT?: Prisma.TripWhereInput | Prisma.TripWhereInput[];
    id?: Prisma.BigIntFilter<"Trip"> | bigint | number;
    name?: Prisma.StringFilter<"Trip"> | string;
    description?: Prisma.StringNullableFilter<"Trip"> | string | null;
    start_time?: Prisma.DateTimeFilter<"Trip"> | Date | string;
    end_time?: Prisma.DateTimeFilter<"Trip"> | Date | string;
    expenses?: Prisma.ExpenseListRelationFilter;
    participants?: Prisma.TripParticipantListRelationFilter;
};
export type TripOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
    expenses?: Prisma.ExpenseOrderByRelationAggregateInput;
    participants?: Prisma.TripParticipantOrderByRelationAggregateInput;
};
export type TripWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.TripWhereInput | Prisma.TripWhereInput[];
    OR?: Prisma.TripWhereInput[];
    NOT?: Prisma.TripWhereInput | Prisma.TripWhereInput[];
    name?: Prisma.StringFilter<"Trip"> | string;
    description?: Prisma.StringNullableFilter<"Trip"> | string | null;
    start_time?: Prisma.DateTimeFilter<"Trip"> | Date | string;
    end_time?: Prisma.DateTimeFilter<"Trip"> | Date | string;
    expenses?: Prisma.ExpenseListRelationFilter;
    participants?: Prisma.TripParticipantListRelationFilter;
}, "id">;
export type TripOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
    _count?: Prisma.TripCountOrderByAggregateInput;
    _avg?: Prisma.TripAvgOrderByAggregateInput;
    _max?: Prisma.TripMaxOrderByAggregateInput;
    _min?: Prisma.TripMinOrderByAggregateInput;
    _sum?: Prisma.TripSumOrderByAggregateInput;
};
export type TripScalarWhereWithAggregatesInput = {
    AND?: Prisma.TripScalarWhereWithAggregatesInput | Prisma.TripScalarWhereWithAggregatesInput[];
    OR?: Prisma.TripScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TripScalarWhereWithAggregatesInput | Prisma.TripScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Trip"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"Trip"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Trip"> | string | null;
    start_time?: Prisma.DateTimeWithAggregatesFilter<"Trip"> | Date | string;
    end_time?: Prisma.DateTimeWithAggregatesFilter<"Trip"> | Date | string;
};
export type TripCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutTripInput;
    participants?: Prisma.TripParticipantCreateNestedManyWithoutTripInput;
};
export type TripUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutTripInput;
    participants?: Prisma.TripParticipantUncheckedCreateNestedManyWithoutTripInput;
};
export type TripUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expenses?: Prisma.ExpenseUpdateManyWithoutTripNestedInput;
    participants?: Prisma.TripParticipantUpdateManyWithoutTripNestedInput;
};
export type TripUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutTripNestedInput;
    participants?: Prisma.TripParticipantUncheckedUpdateManyWithoutTripNestedInput;
};
export type TripCreateManyInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
};
export type TripUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TripUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TripCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
};
export type TripAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type TripMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
};
export type TripMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
};
export type TripSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type TripScalarRelationFilter = {
    is?: Prisma.TripWhereInput;
    isNot?: Prisma.TripWhereInput;
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type TripCreateNestedOneWithoutExpensesInput = {
    create?: Prisma.XOR<Prisma.TripCreateWithoutExpensesInput, Prisma.TripUncheckedCreateWithoutExpensesInput>;
    connectOrCreate?: Prisma.TripCreateOrConnectWithoutExpensesInput;
    connect?: Prisma.TripWhereUniqueInput;
};
export type TripUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: Prisma.XOR<Prisma.TripCreateWithoutExpensesInput, Prisma.TripUncheckedCreateWithoutExpensesInput>;
    connectOrCreate?: Prisma.TripCreateOrConnectWithoutExpensesInput;
    upsert?: Prisma.TripUpsertWithoutExpensesInput;
    connect?: Prisma.TripWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TripUpdateToOneWithWhereWithoutExpensesInput, Prisma.TripUpdateWithoutExpensesInput>, Prisma.TripUncheckedUpdateWithoutExpensesInput>;
};
export type TripCreateNestedOneWithoutParticipantsInput = {
    create?: Prisma.XOR<Prisma.TripCreateWithoutParticipantsInput, Prisma.TripUncheckedCreateWithoutParticipantsInput>;
    connectOrCreate?: Prisma.TripCreateOrConnectWithoutParticipantsInput;
    connect?: Prisma.TripWhereUniqueInput;
};
export type TripUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: Prisma.XOR<Prisma.TripCreateWithoutParticipantsInput, Prisma.TripUncheckedCreateWithoutParticipantsInput>;
    connectOrCreate?: Prisma.TripCreateOrConnectWithoutParticipantsInput;
    upsert?: Prisma.TripUpsertWithoutParticipantsInput;
    connect?: Prisma.TripWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TripUpdateToOneWithWhereWithoutParticipantsInput, Prisma.TripUpdateWithoutParticipantsInput>, Prisma.TripUncheckedUpdateWithoutParticipantsInput>;
};
export type TripCreateWithoutExpensesInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    participants?: Prisma.TripParticipantCreateNestedManyWithoutTripInput;
};
export type TripUncheckedCreateWithoutExpensesInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    participants?: Prisma.TripParticipantUncheckedCreateNestedManyWithoutTripInput;
};
export type TripCreateOrConnectWithoutExpensesInput = {
    where: Prisma.TripWhereUniqueInput;
    create: Prisma.XOR<Prisma.TripCreateWithoutExpensesInput, Prisma.TripUncheckedCreateWithoutExpensesInput>;
};
export type TripUpsertWithoutExpensesInput = {
    update: Prisma.XOR<Prisma.TripUpdateWithoutExpensesInput, Prisma.TripUncheckedUpdateWithoutExpensesInput>;
    create: Prisma.XOR<Prisma.TripCreateWithoutExpensesInput, Prisma.TripUncheckedCreateWithoutExpensesInput>;
    where?: Prisma.TripWhereInput;
};
export type TripUpdateToOneWithWhereWithoutExpensesInput = {
    where?: Prisma.TripWhereInput;
    data: Prisma.XOR<Prisma.TripUpdateWithoutExpensesInput, Prisma.TripUncheckedUpdateWithoutExpensesInput>;
};
export type TripUpdateWithoutExpensesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.TripParticipantUpdateManyWithoutTripNestedInput;
};
export type TripUncheckedUpdateWithoutExpensesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.TripParticipantUncheckedUpdateManyWithoutTripNestedInput;
};
export type TripCreateWithoutParticipantsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutTripInput;
};
export type TripUncheckedCreateWithoutParticipantsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    start_time: Date | string;
    end_time: Date | string;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutTripInput;
};
export type TripCreateOrConnectWithoutParticipantsInput = {
    where: Prisma.TripWhereUniqueInput;
    create: Prisma.XOR<Prisma.TripCreateWithoutParticipantsInput, Prisma.TripUncheckedCreateWithoutParticipantsInput>;
};
export type TripUpsertWithoutParticipantsInput = {
    update: Prisma.XOR<Prisma.TripUpdateWithoutParticipantsInput, Prisma.TripUncheckedUpdateWithoutParticipantsInput>;
    create: Prisma.XOR<Prisma.TripCreateWithoutParticipantsInput, Prisma.TripUncheckedCreateWithoutParticipantsInput>;
    where?: Prisma.TripWhereInput;
};
export type TripUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: Prisma.TripWhereInput;
    data: Prisma.XOR<Prisma.TripUpdateWithoutParticipantsInput, Prisma.TripUncheckedUpdateWithoutParticipantsInput>;
};
export type TripUpdateWithoutParticipantsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expenses?: Prisma.ExpenseUpdateManyWithoutTripNestedInput;
};
export type TripUncheckedUpdateWithoutParticipantsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutTripNestedInput;
};
/**
 * Count Type TripCountOutputType
 */
export type TripCountOutputType = {
    expenses: number;
    participants: number;
};
export type TripCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    expenses?: boolean | TripCountOutputTypeCountExpensesArgs;
    participants?: boolean | TripCountOutputTypeCountParticipantsArgs;
};
/**
 * TripCountOutputType without action
 */
export type TripCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     */
    select?: Prisma.TripCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * TripCountOutputType without action
 */
export type TripCountOutputTypeCountExpensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
/**
 * TripCountOutputType without action
 */
export type TripCountOutputTypeCountParticipantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TripParticipantWhereInput;
};
export type TripSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    start_time?: boolean;
    end_time?: boolean;
    expenses?: boolean | Prisma.Trip$expensesArgs<ExtArgs>;
    participants?: boolean | Prisma.Trip$participantsArgs<ExtArgs>;
    _count?: boolean | Prisma.TripCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trip"]>;
export type TripSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    start_time?: boolean;
    end_time?: boolean;
}, ExtArgs["result"]["trip"]>;
export type TripSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    start_time?: boolean;
    end_time?: boolean;
}, ExtArgs["result"]["trip"]>;
export type TripSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    start_time?: boolean;
    end_time?: boolean;
};
export type TripOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "start_time" | "end_time", ExtArgs["result"]["trip"]>;
export type TripInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    expenses?: boolean | Prisma.Trip$expensesArgs<ExtArgs>;
    participants?: boolean | Prisma.Trip$participantsArgs<ExtArgs>;
    _count?: boolean | Prisma.TripCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TripIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TripIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TripPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Trip";
    objects: {
        expenses: Prisma.$ExpensePayload<ExtArgs>[];
        participants: Prisma.$TripParticipantPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        description: string | null;
        start_time: Date;
        end_time: Date;
    }, ExtArgs["result"]["trip"]>;
    composites: {};
};
export type TripGetPayload<S extends boolean | null | undefined | TripDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TripPayload, S>;
export type TripCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TripFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TripCountAggregateInputType | true;
};
export interface TripDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Trip'];
        meta: {
            name: 'Trip';
        };
    };
    /**
     * Find zero or one Trip that matches the filter.
     * @param {TripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripFindUniqueArgs>(args: Prisma.SelectSubset<T, TripFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Trip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TripFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripFindFirstArgs>(args?: Prisma.SelectSubset<T, TripFindFirstArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Trip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TripFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     *
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tripWithIdOnly = await prisma.trip.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TripFindManyArgs>(args?: Prisma.SelectSubset<T, TripFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Trip.
     * @param {TripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     *
     */
    create<T extends TripCreateArgs>(args: Prisma.SelectSubset<T, TripCreateArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Trips.
     * @param {TripCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TripCreateManyArgs>(args?: Prisma.SelectSubset<T, TripCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Trips and returns the data saved in the database.
     * @param {TripCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TripCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TripCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Trip.
     * @param {TripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     *
     */
    delete<T extends TripDeleteArgs>(args: Prisma.SelectSubset<T, TripDeleteArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Trip.
     * @param {TripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TripUpdateArgs>(args: Prisma.SelectSubset<T, TripUpdateArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Trips.
     * @param {TripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TripDeleteManyArgs>(args?: Prisma.SelectSubset<T, TripDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TripUpdateManyArgs>(args: Prisma.SelectSubset<T, TripUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {TripUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TripUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TripUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Trip.
     * @param {TripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
     */
    upsert<T extends TripUpsertArgs>(args: Prisma.SelectSubset<T, TripUpsertArgs<ExtArgs>>): Prisma.Prisma__TripClient<runtime.Types.Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends TripCountArgs>(args?: Prisma.Subset<T, TripCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TripCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Prisma.Subset<T, TripAggregateArgs>): Prisma.PrismaPromise<GetTripAggregateType<T>>;
    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends TripGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TripGroupByArgs['orderBy'];
    } : {
        orderBy?: TripGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Trip model
     */
    readonly fields: TripFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Trip.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TripClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    expenses<T extends Prisma.Trip$expensesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Trip$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    participants<T extends Prisma.Trip$participantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Trip$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TripParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Trip model
 */
export interface TripFieldRefs {
    readonly id: Prisma.FieldRef<"Trip", 'BigInt'>;
    readonly name: Prisma.FieldRef<"Trip", 'String'>;
    readonly description: Prisma.FieldRef<"Trip", 'String'>;
    readonly start_time: Prisma.FieldRef<"Trip", 'DateTime'>;
    readonly end_time: Prisma.FieldRef<"Trip", 'DateTime'>;
}
/**
 * Trip findUnique
 */
export type TripFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter, which Trip to fetch.
     */
    where: Prisma.TripWhereUniqueInput;
};
/**
 * Trip findUniqueOrThrow
 */
export type TripFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter, which Trip to fetch.
     */
    where: Prisma.TripWhereUniqueInput;
};
/**
 * Trip findFirst
 */
export type TripFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter, which Trip to fetch.
     */
    where?: Prisma.TripWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Trips to fetch.
     */
    orderBy?: Prisma.TripOrderByWithRelationInput | Prisma.TripOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Trips.
     */
    cursor?: Prisma.TripWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Trips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Trips.
     */
    distinct?: Prisma.TripScalarFieldEnum | Prisma.TripScalarFieldEnum[];
};
/**
 * Trip findFirstOrThrow
 */
export type TripFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter, which Trip to fetch.
     */
    where?: Prisma.TripWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Trips to fetch.
     */
    orderBy?: Prisma.TripOrderByWithRelationInput | Prisma.TripOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Trips.
     */
    cursor?: Prisma.TripWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Trips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Trips.
     */
    distinct?: Prisma.TripScalarFieldEnum | Prisma.TripScalarFieldEnum[];
};
/**
 * Trip findMany
 */
export type TripFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter, which Trips to fetch.
     */
    where?: Prisma.TripWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Trips to fetch.
     */
    orderBy?: Prisma.TripOrderByWithRelationInput | Prisma.TripOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Trips.
     */
    cursor?: Prisma.TripWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Trips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Trips.
     */
    distinct?: Prisma.TripScalarFieldEnum | Prisma.TripScalarFieldEnum[];
};
/**
 * Trip create
 */
export type TripCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * The data needed to create a Trip.
     */
    data: Prisma.XOR<Prisma.TripCreateInput, Prisma.TripUncheckedCreateInput>;
};
/**
 * Trip createMany
 */
export type TripCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trips.
     */
    data: Prisma.TripCreateManyInput | Prisma.TripCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Trip createManyAndReturn
 */
export type TripCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * The data used to create many Trips.
     */
    data: Prisma.TripCreateManyInput | Prisma.TripCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Trip update
 */
export type TripUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * The data needed to update a Trip.
     */
    data: Prisma.XOR<Prisma.TripUpdateInput, Prisma.TripUncheckedUpdateInput>;
    /**
     * Choose, which Trip to update.
     */
    where: Prisma.TripWhereUniqueInput;
};
/**
 * Trip updateMany
 */
export type TripUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Trips.
     */
    data: Prisma.XOR<Prisma.TripUpdateManyMutationInput, Prisma.TripUncheckedUpdateManyInput>;
    /**
     * Filter which Trips to update
     */
    where?: Prisma.TripWhereInput;
    /**
     * Limit how many Trips to update.
     */
    limit?: number;
};
/**
 * Trip updateManyAndReturn
 */
export type TripUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * The data used to update Trips.
     */
    data: Prisma.XOR<Prisma.TripUpdateManyMutationInput, Prisma.TripUncheckedUpdateManyInput>;
    /**
     * Filter which Trips to update
     */
    where?: Prisma.TripWhereInput;
    /**
     * Limit how many Trips to update.
     */
    limit?: number;
};
/**
 * Trip upsert
 */
export type TripUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * The filter to search for the Trip to update in case it exists.
     */
    where: Prisma.TripWhereUniqueInput;
    /**
     * In case the Trip found by the `where` argument doesn't exist, create a new Trip with this data.
     */
    create: Prisma.XOR<Prisma.TripCreateInput, Prisma.TripUncheckedCreateInput>;
    /**
     * In case the Trip was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.TripUpdateInput, Prisma.TripUncheckedUpdateInput>;
};
/**
 * Trip delete
 */
export type TripDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
    /**
     * Filter which Trip to delete.
     */
    where: Prisma.TripWhereUniqueInput;
};
/**
 * Trip deleteMany
 */
export type TripDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Trips to delete
     */
    where?: Prisma.TripWhereInput;
    /**
     * Limit how many Trips to delete.
     */
    limit?: number;
};
/**
 * Trip.expenses
 */
export type Trip$expensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Expense
     */
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
/**
 * Trip.participants
 */
export type Trip$participantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripParticipant
     */
    select?: Prisma.TripParticipantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TripParticipant
     */
    omit?: Prisma.TripParticipantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripParticipantInclude<ExtArgs> | null;
    where?: Prisma.TripParticipantWhereInput;
    orderBy?: Prisma.TripParticipantOrderByWithRelationInput | Prisma.TripParticipantOrderByWithRelationInput[];
    cursor?: Prisma.TripParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TripParticipantScalarFieldEnum | Prisma.TripParticipantScalarFieldEnum[];
};
/**
 * Trip without action
 */
export type TripDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: Prisma.TripSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Trip
     */
    omit?: Prisma.TripOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TripInclude<ExtArgs> | null;
};
//# sourceMappingURL=Trip.d.ts.map