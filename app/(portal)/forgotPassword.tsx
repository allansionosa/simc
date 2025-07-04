import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ForgotPasswordFormData = {
  email: string;
};
type ForgotPasswordProps = {
  onSubmit: (values: ForgotPasswordFormData) => void;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
};

const passwordSchema = z.object({
  email: z.string().email(),
});
export default function ForgotPassword({
  onSubmit,
  loading,
  open,
  onClose,
}: ForgotPasswordProps) {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
      }}
    >
      <DialogContent className="p-5">
        {' '}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. JohnDoe@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the email address associated with your account and
                    we&apos;ll send a password reset link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mt-5"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="mt-5">
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
