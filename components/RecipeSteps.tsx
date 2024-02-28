interface stepsProps {
  steps: string[];
}

const RecipeSteps = ({ steps }: stepsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold md:text-2xl">Recipe steps:</p>
      {/* TODO: Turn this into a table with checklist and col view! */}
      <table className="border-separate border-spacing-y-1 px-2">
        <tbody>
          {steps.map((item, index) => {
            return (
              <tr key={index.toString()} className="">
                <th className="">
                  <div className="flex flex-row gap-2 rounded-md border border-border p-2 group bg-card group-checked:bg-accent hover:bg-accent">
                    <input
                      type="checkbox"
                      className="peer group accent-primary"
                    />
                    <div className="flex flex-col items-start justify-start pl-1 peer-checked:line-through">
                      <p className="font-semibold text-lg mb-1 underline">
                        Step {index + 1}:
                      </p>
                      <p className="text-left font-normal">{item}</p>
                    </div>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeSteps;
