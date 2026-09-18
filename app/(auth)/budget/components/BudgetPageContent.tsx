import { Plus } from "lucide-react";
import { BudgetUse } from "./BudgetUse";
import { BudgetDialog } from "./BudgetDialog";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { budgetCategories } from "../constants";

export const BudgetPageContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orçamentos</h1>
          <h2 className="text-lg text-muted-foreground">Setembro</h2>
        </div>
        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg" variant="outline">
                <Plus /> Adicionar orçamento
              </Button>
            }
          />
          <BudgetDialog />
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgetCategories.map((item, index) => (
          <BudgetUse
            key={index}
            amount={item.amount}
            title={item.title}
            icon={item.icon}
            totalAmount={item.totalAmount}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
          />
        ))}
        <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-4 text-muted-foreground hover:border-primary hover:text-primary"
        >
          <Plus size={20} />
          <span className="text-sm font-medium">Adicionar categoria</span>
        </Button>
      </div>
    </div>
  );
};
