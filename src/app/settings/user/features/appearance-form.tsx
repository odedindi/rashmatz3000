import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import type { FC } from 'react';
import { useTheme } from 'next-themes';
import { UseThemeProps } from 'next-themes/dist/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const defaultValues: Partial<AppearanceFormValues> = {
  font: 'inter',
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
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded capitalize">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded">
                  {['inter', 'manrope', 'system'].map((font, i) => (
                    <SelectItem key={i} value={font} className="capitalize">
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

        <Button type="submit" className="rounded">
          Update preferences
        </Button>
      </form>
    </Form>
  );
};

export default AppearanceForm;

const AppSkelaton: FC<{
  theme: UseThemeProps['systemTheme'];
}> = ({ theme }) => {
  const bgColor = theme === 'dark' ? 'bg-slate-700' : 'bg-[#ecedef]';
  const containerBgColor = theme === 'dark' ? 'bg-slate-800' : 'bg-[#fff]';
  const elementsBgColor = theme === 'dark' ? 'bg-slate-700' : 'bg-[#ecedef]';

  return (
    <div className="cursor-pointer items-center rounded border-2 border-muted p-1 hover:border-accent">
      <div className={`space-y-2 rounded ${bgColor} p-2`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center space-x-2 rounded p-2 shadow-sm ${containerBgColor}`}
          >
            <div className={`h-4 w-4 rounded-full ${elementsBgColor}`} />
            <div className={`h-2 w-full rounded ${elementsBgColor}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
