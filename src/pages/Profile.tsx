"use client"

import { NokenCharts } from "@/components/NokenCharts";
import { StudyCalendar } from "@/components/StudyCalendar";
import { useAuth } from "@/hooks/useAuth";
import useVocabularyStatus from "@/hooks/useVocabularyStatus";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, updatePassword, updateDisplayName } = useAuth();
  const { studyDays } = useVocabularyStatus();
  
  // Mensajes globales
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Formulario de password
  const formPassword = useForm<{ oldPassword: string; newPassword: string }>({
    defaultValues: { oldPassword: '', newPassword: '' }
  });
  
  // Formulario de display name
  const formDisplay = useForm<{ displayName: string }>({
    defaultValues: { displayName: user?.user_metadata.display_name || '' }
  });

  const handlePasswordChange = async (data: {oldPassword: string; newPassword: string}) => {
    setMessage('');
    setError('');
    try {
      await updatePassword(data.oldPassword, data.newPassword);
      setMessage('Contraseña actualizada exitosamente.');
      formPassword.reset();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateDisplayName = async (data: { displayName: string }) => {
    setMessage('');
    setError('');
    try {
      await updateDisplayName(data.displayName);
      setMessage('Nombre actualizado exitosamente.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 bg-white shadow rounded p-4">
          <nav>
            <ul className="space-y-4">
              <li><a href="#dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
              <li><a href="#datos" className="text-blue-600 hover:underline">Datos de Perfil</a></li>
              <li><a href="#ajustes" className="text-blue-600 hover:underline">Ajustes de Cuenta</a></li>
            </ul>
          </nav>
        </aside>
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Bienvenido, {user?.email}</h1>
  
          <p className="mb-8 text-gray-600">
            Aquí encontrarás un resumen de tu progreso: el calendario muestra tus días de estudio y las gráficas indican el avance por nivel, mostrando palabras aprendidas, no aprendidas y por aprender.
          </p>
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-semibold mb-4">Calendario de Estudio</h2>
              <StudyCalendar dates={studyDays} />
            </div>
            <div className="bg-white shadow rounded p-4 col-span-2">
              <h2 className="text-xl font-semibold mb-4">Estadísticas de Progreso</h2>
              <NokenCharts />
            </div>
          </div>
          {/* Password Change Section */}
          <div id="ajustes" className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Ajustes de Cuenta</h2>
            {/* Formulario de cambio de contraseña */}
            <Form {...formPassword}>
              <form onSubmit={formPassword.handleSubmit(handlePasswordChange)} className="space-y-4">
                <FormField
                  control={formPassword.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <div>
                      <FormLabel htmlFor="oldPassword">Contraseña Actual</FormLabel>
                      <FormControl>
                        <Input id="oldPassword" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={formPassword.control}
                  name="newPassword"
                  render={({ field }) => (
                    <div>
                      <FormLabel htmlFor="newPassword">Nueva Contraseña</FormLabel>
                      <FormControl>
                        <Input id="newPassword" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <Button type="submit">Cambiar Contraseña</Button>
                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </form>
            </Form>
            {/* Formulario de cambio de nombre */}
            <Form {...formDisplay}>
              <form onSubmit={formDisplay.handleSubmit(handleUpdateDisplayName)}  className="space-y-4 mt-4">
                <FormField
                  control={formDisplay.control}
                  name="displayName"
                  render={({ field }) => (
                    <div>
                      <FormLabel htmlFor="displayName">Nombre para mostrar</FormLabel>
                      <FormControl>
                        <Input id="displayName" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <Button type="submit">Cambiar Nombre</Button>
                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
