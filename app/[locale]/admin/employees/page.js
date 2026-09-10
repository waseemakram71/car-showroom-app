import { getTranslations } from 'next-intl/server'
import EmployeesTable from '@/components/admin/EmployeesTable'

export default async function AdminEmployeesPage({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });

  const translations = {
    manageEmployees: t('manageEmployees'),
    addEmployee: t('addEmployee'),
    employee: t('employee'),
    role: t('role'),
    salary: t('salary'),
    status: t('status'),
    actions: t('actions'),
    noEmployees: t('noEmployees'),
  }

  return <EmployeesTable locale={locale} translations={translations} />
}
