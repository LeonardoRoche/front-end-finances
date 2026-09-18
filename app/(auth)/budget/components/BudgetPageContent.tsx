import { Plus } from "lucide-react";
import { BudgetUse } from "./BudgetUse";
import { BudgetDialog } from "./BudgetDialog";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { budgetCategories } from "../constants";

export const BudgetPageContent = () => {
  function handleAddCategory() {
    // Lógica para adicionar uma nova categoria de orçamento
  }

  return (
    <Dialog>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Orçamentos"
          description="Setembro 2026"
          action={
            <DialogTrigger
              render={
                <Button size="lg">
                  <Plus /> Adicionar orçamento
                </Button>
              }
            />
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {budgetCategories.map((item) => (
            <BudgetUse
              key={item.title}
              amount={item.amount}
              title={item.title}
              icon={item.icon}
              totalAmount={item.totalAmount}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
            />
          ))}
          <DialogTrigger
            render={
              <Button
                variant="outline"
                className="h-auto min-h-32 flex-col gap-2 rounded-xl border-dashed border-muted-foreground/40 bg-transparent p-4 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Plus size={20} />
                <span className="text-sm font-medium">Adicionar categoria</span>
              </Button>
            }
          />
        </div>
      </div>
      <BudgetDialog />
    </Dialog>
  );
};
