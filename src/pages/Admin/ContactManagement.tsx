
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Archive, Trash2, CheckCircle, AlertCircle, MessageSquare, Users, Star } from "lucide-react";

// Datos de ejemplo para simular contactos
const mockContacts = [
  {
    id: 1,
    name: "Elena Martínez",
    email: "elena@ejemplo.com",
    subject: "Consulta sobre proteínas veganas",
    message: "Me gustaría saber si tienen proteínas aptas para veganos. Gracias.",
    date: "2023-10-15T09:30:00",
    status: "unread",
    type: "inquiry"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    subject: "Problema con mi pedido #12345",
    message: "Mi pedido llegó incompleto, faltan 2 productos. Necesito ayuda urgente.",
    date: "2023-10-14T14:45:00",
    status: "read",
    type: "complaint"
  },
  {
    id: 3,
    name: "Laura González",
    email: "laura@ejemplo.com",
    subject: "Sugerencia para nuevos productos",
    message: "Me encantaría que incluyeran más opciones sin gluten en su catálogo.",
    date: "2023-10-13T11:20:00",
    status: "read",
    type: "suggestion"
  },
  {
    id: 4,
    name: "Martín López",
    email: "martin@empresa.com",
    subject: "Propuesta de colaboración",
    message: "Represento a GymFit y nos gustaría explorar una posible asociación con su marca.",
    date: "2023-10-12T16:10:00",
    status: "unread",
    type: "partnership"
  },
  {
    id: 5,
    name: "Sofía Hernández",
    email: "sofia@ejemplo.com",
    subject: "Consulta sobre envíos internacionales",
    message: "¿Realizan envíos a México? Me interesa comprar varios productos.",
    date: "2023-10-11T10:05:00",
    status: "archived",
    type: "inquiry"
  }
];

const ContactManagement = () => {
  const { t } = useLanguage();
  const [contacts, setContacts] = useState(mockContacts);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtrar contactos basados en la pestaña activa y la búsqueda
  const filteredContacts = contacts.filter(contact => {
    // Filtro por estado
    if (activeTab !== "all" && contact.status !== activeTab) {
      return false;
    }
    
    // Filtro por búsqueda
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.subject.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Marcar como leído
  const markAsRead = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: "read" } : contact
    ));
  };
  
  // Marcar como no leído
  const markAsUnread = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: "unread" } : contact
    ));
  };
  
  // Archivar contacto
  const archiveContact = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: "archived" } : contact
    ));
  };
  
  // Eliminar contacto
  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  // Obtener ícono según el tipo de contacto
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return <MessageSquare className="w-4 h-4" />;
      case "complaint":
        return <AlertCircle className="w-4 h-4" />;
      case "suggestion":
        return <Star className="w-4 h-4" />;
      case "partnership":
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('admin.contact.title')}</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Barra lateral con estadísticas */}
        <Card className="w-full md:w-64 flex-shrink-0">
          <CardHeader>
            <CardTitle>{t('admin.contact.messages')}</CardTitle>
            <CardDescription>Gestionar comunicaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t('admin.contact.inquiries')}
                </span>
                <Badge variant="outline">{contacts.filter(c => c.type === 'inquiry').length}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {t('admin.contact.complaints')}
                </span>
                <Badge variant="outline">{contacts.filter(c => c.type === 'complaint').length}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  {t('admin.contact.suggestions')}
                </span>
                <Badge variant="outline">{contacts.filter(c => c.type === 'suggestion').length}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  {t('admin.contact.partnerships')}
                </span>
                <Badge variant="outline">{contacts.filter(c => c.type === 'partnership').length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Lista de contactos */}
        <div className="flex-1 w-full">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <CardTitle>{t('admin.contact.messages')}</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder={t('admin.contact.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-[300px]"
                  />
                  <Select defaultValue="date">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Fecha</SelectItem>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="type">Tipo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">{t('admin.contact.all')}</TabsTrigger>
                  <TabsTrigger value="unread">{t('admin.contact.unread')}</TabsTrigger>
                  <TabsTrigger value="read">{t('admin.contact.read')}</TabsTrigger>
                  <TabsTrigger value="archived">{t('admin.contact.archived')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map(contact => (
                        <div 
                          key={contact.id} 
                          className={`p-4 border rounded-lg ${
                            contact.status === 'unread' 
                              ? 'bg-muted/30 border-primary/20' 
                              : contact.status === 'archived'
                                ? 'bg-muted/10 border-muted' 
                                : 'bg-background border-border'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 bg-primary/10 text-primary">
                                <span>{contact.name.charAt(0)}</span>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{contact.name}</h4>
                                <p className="text-sm text-muted-foreground">{contact.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                {getTypeIcon(contact.type)}
                                <span className="capitalize">{contact.type}</span>
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(contact.date)}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="font-medium mb-2">{contact.subject}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{contact.message}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Mail className="w-4 h-4" />
                              {t('admin.contact.reply')}
                            </Button>
                            
                            {contact.status !== 'read' ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => markAsRead(contact.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                                {t('admin.contact.markAsRead')}
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => markAsUnread(contact.id)}
                              >
                                <Mail className="w-4 h-4" />
                                {t('admin.contact.markAsUnread')}
                              </Button>
                            )}
                            
                            {contact.status !== 'archived' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => archiveContact(contact.id)}
                              >
                                <Archive className="w-4 h-4" />
                                {t('admin.contact.archive')}
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
                              onClick={() => deleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              {t('admin.contact.delete')}
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No hay mensajes que mostrar
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="mt-0">
                  {/* Contenido idéntico, pero se filtra por el estado */}
                </TabsContent>
                
                <TabsContent value="read" className="mt-0">
                  {/* Contenido idéntico, pero se filtra por el estado */}
                </TabsContent>
                
                <TabsContent value="archived" className="mt-0">
                  {/* Contenido idéntico, pero se filtra por el estado */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
