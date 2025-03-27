
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent } from "../ui/dialog";
import { Search, Filter, Eye, UserRound, Dumbbell, ShoppingBag } from "lucide-react";
import ClientDetails from "./ClientDetails";

interface ClientDataGridProps {
  clients: any[];
  filterOptions: {
    label: string;
    value: string;
  }[];
}

const ClientDataGrid = ({ clients, filterOptions }: ClientDataGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredClients, setFilteredClients] = useState(clients);

  // Apply filters whenever search term or category changes
  useEffect(() => {
    const filtered = clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || client.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    
    setFilteredClients(filtered);
  }, [clients, searchTerm, selectedCategory]);

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setDialogOpen(true);
  };

  // Get client type icon
  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case "supplement":
        return <ShoppingBag className="h-4 w-4 text-blue-600" />;
      case "plan":
        return <Dumbbell className="h-4 w-4 text-green-600" />;
      default:
        return <UserRound className="h-4 w-4 text-spartan-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="md:w-64 flex">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los tipos</SelectItem>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead>Actividad</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-spartan-gray-500">
                  No se encontraron clientes que coincidan con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-spartan-light transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-spartan-primary/10">
                        {getClientTypeIcon(client.type)}
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded ${
                      client.type === "supplement" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {client.type === "supplement" ? "Suplementos" : "Planes"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(client.registeredDate).toLocaleDateString("es-CR")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {client.type === "supplement" ? (
                        <>
                          <ShoppingBag className="h-4 w-4 text-spartan-gray-400" />
                          <span className="text-sm">{client.orders.length} pedidos</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="h-4 w-4 text-spartan-gray-400" />
                          <span className="text-sm">{client.trainingPlans.length} planes</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClient(client)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Client Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDataGrid;
