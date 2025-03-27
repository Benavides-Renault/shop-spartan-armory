
import React, { useState } from 'react';
import { User, Clock, Mail, Phone, MessageSquare, Reply } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface MessageViewProps {
  message: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    date: string;
    subject: string;
    content: string;
    status: 'pending' | 'answered';
    category: string;
  };
  onReply: (messageId: string, reply: string) => void;
  onClose: () => void;
}

const MessageView = ({ message, onReply, onClose }: MessageViewProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [activeTab, setActiveTab] = useState<'message' | 'reply'>('message');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleReply = () => {
    if (!replyContent.trim()) {
      toast.error("Por favor, escriba una respuesta.");
      return;
    }
    
    onReply(message.id, replyContent);
    setReplyContent('');
    setActiveTab('message');
    toast.success("Respuesta enviada con éxito");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{message.subject}</h2>
          <div className="flex items-center space-x-2 text-spartan-gray-500 mt-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(message.date)}</span>
          </div>
        </div>
        <div>
          <span className={`px-2 py-1 text-xs rounded ${
            message.status === 'pending' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {message.status === 'pending' ? 'Pendiente' : 'Respondido'}
          </span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'message' | 'reply')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="message">Mensaje</TabsTrigger>
          <TabsTrigger value="reply">Responder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="message">
          <Card className="p-5 mt-2">
            <div className="flex space-x-4 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-spartan-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-spartan-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{message.name}</h3>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center text-sm text-spartan-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{message.email}</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center text-sm text-spartan-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{message.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-spartan-gray-500">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Categoría: {message.category}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="py-4">
              <h4 className="font-medium mb-2">Contenido del mensaje:</h4>
              <div className="bg-gray-50 p-4 rounded-md border">
                <p className="text-spartan-gray-700 whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reply">
          <div className="space-y-4 mt-2">
            <h3 className="font-medium flex items-center">
              <Reply className="h-5 w-5 mr-2" />
              Responder mensaje
            </h3>
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Escriba aquí su respuesta..."
              rows={6}
            />
            <div className="flex space-x-3 justify-end">
              <Button variant="outline" onClick={() => setActiveTab('message')}>Cancelar</Button>
              <Button onClick={handleReply}>Enviar respuesta</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
};

export default MessageView;
