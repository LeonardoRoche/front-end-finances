import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { budgetCategories } from "../constants";

export const BudgetDialog = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo orçamento</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="grid gap-1.5">
          <Label htmlFor="category">Categoria</Label>
          <Select>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {budgetCategories.map((item) => (
                <SelectItem key={item.title} value={item.title}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="limit">Valor limite</Label>
          <Input id="limit" placeholder="R$ 0,00" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="period">Período</Label>
          <Select defaultValue="monthly">
            <SelectTrigger id="period" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="alert">Alertar ao atingir</Label>
          <Select defaultValue="80">
            <SelectTrigger id="alert" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80">80% do limite</SelectItem>
              <SelectItem value="100">100% do limite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
        <Button>Criar orçamento</Button>
      </DialogFooter>
    </DialogContent>
  );
};
