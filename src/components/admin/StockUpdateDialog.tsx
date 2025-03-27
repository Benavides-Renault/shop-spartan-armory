
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Package } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface StockUpdateDialogProps {
  productName: string;
  currentStock: number;
  onStockUpdate: (newStock: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StockUpdateDialog = ({ productName, currentStock, onStockUpdate, open, onOpenChange }: StockUpdateDialogProps) => {
  const [newStock, setNewStock] = useState<number>(0);
  const [stockType, setStockType] = useState<'add' | 'set'>('add');
  const [resultingStock, setResultingStock] = useState<number>(currentStock);
  
  // Reset form values when dialog opens
  useEffect(() => {
    if (open) {
      setNewStock(0);
      setStockType('add');
      setResultingStock(currentStock);
    }
  }, [open, currentStock]);
  
  // Calculate resulting stock whenever inputs change
  useEffect(() => {
    if (stockType === 'add') {
      setResultingStock(currentStock + newStock);
    } else {
      setResultingStock(newStock);
    }
  }, [newStock, stockType, currentStock]);
  
  const handleStockUpdate = () => {
    if (resultingStock < 0) {
      toast.error("El stock no puede ser negativo");
      return;
    }
    
    onStockUpdate(resultingStock);
    toast.success(`Stock de ${productName} actualizado a ${resultingStock} unidades`);
    onOpenChange(false);
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Actualizar Stock
          </AlertDialogTitle>
          <AlertDialogDescription>
            Actualice el stock de <span className="font-medium">{productName}</span>.
            <div className="mt-2 p-3 bg-spartan-light rounded-md">
              <p className="text-sm">Stock actual: <span className="font-medium">{currentStock} unidades</span></p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue="add" onValueChange={(value) => setStockType(value as 'add' | 'set')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Añadir unidades</TabsTrigger>
              <TabsTrigger value="set">Establecer stock</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add" className="space-y-2 mt-2">
              <div>
                <label htmlFor="newStock" className="text-sm font-medium">
                  Unidades a añadir:
                </label>
                <Input
                  id="newStock"
                  type="number"
                  min="0"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  placeholder="Ingrese cantidad"
                  className="mt-1"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="set" className="space-y-2 mt-2">
              <div>
                <label htmlFor="setStock" className="text-sm font-medium">
                  Establecer stock total:
                </label>
                <Input
                  id="setStock"
                  type="number"
                  min="0"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  placeholder="Ingrese stock total"
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Stock resultante: <span className="font-medium">{resultingStock} unidades</span>
            </p>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleStockUpdate}>Actualizar Stock</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StockUpdateDialog;
