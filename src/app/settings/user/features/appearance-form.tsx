import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';
import { useTheme } from 'next-themes';
import { UseThemeProps } from 'next-themes/dist/types';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'system',
};

const AppearanceForm: FC = () => {
  const { setTheme, themes, systemTheme } = useTheme();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Font</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full appearance-none font-normal'
                    )}
                    {...field}
                  >
                    <option value="inter">Inter</option>
                    <option value="manrope">Manrope</option>
                    <option value="system">System</option>
                  </select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(theme) => {
                  console.log({ theme });
                  setTheme(theme);

                  field.onChange(theme);
                }}
                defaultValue={field.value}
                className="xs:grid-rows-3 mx-auto grid w-full gap-8 pt-2 md:grid-cols-3"
              >
                {themes.map((themeStr) => {
                  const { theme } = appearanceFormSchema
                    .pick({ theme: true })
                    .parse({ theme: themeStr });

                  return (
                    <FormItem key={theme}>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value={theme} className="sr-only" />
                        </FormControl>
                        <AppSkelaton
                          theme={theme === 'system' ? systemTheme : theme}
                        />
                        <span className="block w-full p-2 text-center font-normal capitalize">
                          {theme}
                        </span>
                      </FormLabel>
                    </FormItem>
                  );
                })}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  );
};

export default AppearanceForm;

const AppSkelaton: FC<{
  theme: UseThemeProps['systemTheme'];
}> = ({ theme }) => {
  const bgColor = theme === 'light' ? '[#ecedef]' : 'slate-950';
  const containerColor = theme === 'light' ? 'white' : 'slate-800';
  const contenttColor = theme === 'light' ? '[#ecedef]' : 'slate-400';

  return (
    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
      <div className={`space-y-2 rounded-sm bg-${bgColor} p-2`}>
        <div
          className={`space-y-2 rounded-md bg-${containerColor} p-2 shadow-sm`}
        >
          <div className={`h-2 w-[80px] rounded-lg bg-${contenttColor}`} />
          <div className={`h-2 w-[100px] rounded-lg bg-${contenttColor}`} />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center space-x-2 rounded-md bg-${containerColor} p-2 shadow-sm`}
          >
            <div className={`h-4 w-4 rounded-full bg-${contenttColor}`} />
            <div className={`h-2 w-[100px] rounded-lg bg-${contenttColor}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
