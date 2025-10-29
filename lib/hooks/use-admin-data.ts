import useSWR from "swr"

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json())

export function useAdminData(token: string) {
  const { data: services, mutate: mutateServices } = useSWR(token ? ["/api/services", token] : null, ([url, token]) =>
    fetcher(url, token),
  )

  const { data: projects, mutate: mutateProjects } = useSWR(token ? ["/api/projects", token] : null, ([url, token]) =>
    fetcher(url, token),
  )

  const { data: companies, mutate: mutateCompanies } = useSWR(
    token ? ["/api/companies", token] : null,
    ([url, token]) => fetcher(url, token),
  )

  const { data: contact, mutate: mutateContact } = useSWR(token ? ["/api/contact", token] : null, ([url, token]) =>
    fetcher(url, token),
  )

  return {
    services: services || [],
    projects: projects || [],
    companies: companies || [],
    contact,
    mutateServices,
    mutateProjects,
    mutateCompanies,
    mutateContact,
  }
}
