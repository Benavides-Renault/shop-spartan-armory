
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User } from '@/types';

const MyAccount = () => {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, aquí se enviaría la actualización al backend
    toast.success(t('myaccount.profileUpdated'));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t('myaccount.passwordsDoNotMatch'));
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error(t('myaccount.passwordTooShort'));
      return;
    }
    
    // En una aplicación real, aquí se enviaría la actualización al backend
    toast.success(t('myaccount.passwordUpdated'));
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">{t('common.loading')}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 mt-16">{t('myaccount.title')}</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('myaccount.personalInfo')}</CardTitle>
              <CardDescription>
                {t('myaccount.updateYourPersonalInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('myaccount.name')}</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleProfileChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('myaccount.email')}</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profileData.email} 
                    onChange={handleProfileChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('myaccount.phone')}</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profileData.phone || ''} 
                    onChange={handleProfileChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">{t('myaccount.address')}</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={profileData.address || ''} 
                    onChange={handleProfileChange} 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  {t('myaccount.updateProfile')}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Password Change Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('myaccount.passwordChange')}</CardTitle>
              <CardDescription>
                {t('myaccount.updateYourPassword')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('myaccount.currentPassword')}</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword" 
                    type="password" 
                    value={passwordData.currentPassword} 
                    onChange={handlePasswordChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('myaccount.newPassword')}</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    value={passwordData.newPassword} 
                    onChange={handlePasswordChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('myaccount.confirmPassword')}</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={passwordData.confirmPassword} 
                    onChange={handlePasswordChange} 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  {t('myaccount.updatePassword')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
