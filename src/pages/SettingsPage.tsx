import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {

  const { user, updatePassword, updateDisplayName } = useAuth();
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

  const handlePasswordChange = async (data: { oldPassword: string; newPassword: string }) => {
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
    <div className="container mx-auto py-10 px-10 md:px-0">
      <h2 className="text-2xl font-semibold mb-4">Ajustes de Cuenta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-background border border-border rounded shadow">
          <Form {...formPassword}>
            <form onSubmit={formPassword.handleSubmit(handlePasswordChange)} className="space-y-4 p-2">
              <FormField
                control={formPassword.control}
                name="oldPassword"
                render={({ field }) => (
                  <div>
                    <FormLabel htmlFor="oldPassword" className="mb-2">Contraseña Actual</FormLabel>
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
                    <FormLabel htmlFor="newPassword" className="mb-2">Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input id="newPassword" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="cursor-pointer text-foreground">Cambiar Contraseña</Button>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
          </Form>
        </div>
        <div className="p-6 bg-background border border-border rounded shadow">
          <Form {...formDisplay}>
            <form onSubmit={formDisplay.handleSubmit(handleUpdateDisplayName)} className="space-y-4 p-2">
              <FormField
                control={formDisplay.control}
                name="displayName"
                render={({ field }) => (
                  <div>
                    <FormLabel htmlFor="displayName" className="mb-2">Nombre para mostrar</FormLabel>
                    <FormControl>
                      <Input id="displayName" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="cursor-pointer text-foreground">Cambiar Nombre</Button>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
