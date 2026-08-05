/**
 * Unit costs behind the giving calculator.
 *
 * ⚠️  DRAFT — every figure below is an ESTIMATE written by us, not a costing
 *     supplied by the foundation. The calculator is honest about this on the
 *     page. Replace with the foundation's real unit costs before launch:
 *     a donor who gives against a wrong figure has been misled.
 */

export type GivingUnit = {
  /** Naira cost of one unit. */
  cost: number;
  /** Singular / plural noun for the thing funded. */
  one: string;
  many: string;
};

export const givingUnits: GivingUnit[] = [
  { cost: 15000, one: "school term funded", many: "school terms funded" },
  { cost: 8000, one: "learning kit", many: "learning kits" },
  { cost: 5500, one: "school uniform", many: "school uniforms" },
  { cost: 3500, one: "health screening", many: "health screenings" },
];

export const givingPresets = [10000, 25000, 50000, 150000];

export const givingRange = { min: 2500, max: 500000, step: 2500 };

export const naira = (value: number) =>
  `₦${value.toLocaleString("en-NG")}`;
