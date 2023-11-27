export default function useHostUrl() {
  const originUrl =
    process.env.NEXT_PUBLIC_SITE_HOST_URL_AUTH ||
    (typeof window === 'object' && document.location.origin);
  const urlStatus = `${originUrl}/status`;
  const urlSignin = `${originUrl}/signin`;

  return { originUrl, urlStatus, urlSignin };
}
