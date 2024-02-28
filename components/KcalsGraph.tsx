"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface kcalsGraphProps {
  prote: number;
  carbs: number;
  sugar: number;
  fat: number;
  saturatedFat: number;
  salt: number;
  fiber: number;
  units: string;
}

const KcalsGraph = (values: kcalsGraphProps) => {
  const data = [
    { name: "Protein", value: values.prote },
    { name: "Carbs", value: values.carbs },
    { name: "Fat", value: values.fat },
  ];

  const kcals = values.prote * 4 + values.carbs * 4 + values.fat * 8;

  const COLORS = ["#F34A4A", "#FCB704", "#33DB99"];
  return (
    <div className="flex flex-col w-full h-full items-center border border-border rounded-md gap-2 px-2 py-4 bg-card">
      <p className="text-lg font-bold md:text-2xl">
        Nutrition facts per {values.units === "serving"? "serving" : values.units === "pieces" ? "piece" : "100 " + values.units}:
      </p>
      <div className="flex flex-col justify-center pr-2 gap-2 md:gap-4 md:flex-row lg:gap-8 md:justify-between items-center h-full">
        {/* Graph */}
        <div
          style={{ width: 160, height: 160 }}
          suppressHydrationWarning
          className="min-w-[160px] mx-6 scale-90 md:scale-100 "
        >
          <ResponsiveContainer>
            <PieChart
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              className="outline-none"
            >
              <text
                x={80}
                y={80}
                textAnchor="middle"
                dominantBaseline="middle"
                className="dark:hidden font-semibold"
              >
                {Math.round(kcals * 100) / 100} kcals
              </text>
              <text
                x={80}
                y={80}
                fill="#FFFFFF"
                textAnchor="middle"
                dominantBaseline="middle"
                className="hidden dark:block font-semibold"
              >
                {Math.round(kcals * 100) / 100} kcals
              </text>
              <Pie
                data={data}
                cx={80}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 w-full items-center md:items-start">
            {/* Prote */}
            <div className="flex flex-row gap-2 items-center justify-center flex-wrap">
              <div className="min-w-4 min-h-4 bg-[#F34A4A] rounded-sm" />
              <p className="text-base md:text-lg font-semibold">
                {Math.round(values.prote * 100) / 100} g of Protein
              </p>
            </div>
            {/* Carbs */}
            <div className="flex flex-row gap-2 justify-center items-center flex-wrap">
              <div className="min-w-4 min-h-4 bg-[#FCB704] rounded-sm" />
              <p className="text-base md:text-lg font-semibold">
                {Math.round(values.carbs * 100) / 100} g of Carbohydrates
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                of which sugars:
                <span className="font-semibold text-foreground">
                  {" "}
                  {Math.round(values.sugar * 100) / 100} g
                </span>
              </p>
            </div>
            {/* Fat */}
            <div className="flex flex-row gap-2 justify-center items-center flex-wrap">
              <div className="min-w-4 min-h-4 bg-[#33DB99] rounded-sm" />
              <p className="text-base md:text-lg font-semibold">
                {Math.round(values.fat * 100) / 100} g of Fats
              </p>
              <p className="text-base md:text-lgtext-muted-foreground">
                of which saturated:
                <span className="font-semibold text-foreground">
                  {" "}
                  {Math.round(values.saturatedFat * 100) / 100} g
                </span>
              </p>
            </div>
            {/* SALT */}
              <div className="flex flex-row gap-2 items-center justify-center flex-wrap">
                <p className="text-base md:text-lg font-semibold">
                  {Math.round(values.salt * 100) / 100} g of Salt
                </p>
              </div>
              {/* FIBER */}
              <div className="flex flex-row gap-2 items-center justify-center flex-wrap">
                <p className="text-base md:text-lg font-semibold">
                  {Math.round(values.fiber * 100) / 100} g of Fiber
                </p>
              </div>
        </div>
      </div>
    </div>
  );
};

export default KcalsGraph;
