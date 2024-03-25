import {
  PROVIDER_APPLE,
  PROVIDER_FACEBOOK,
  PROVIDER_GOOGLE,
  PROVIDER_TAG,
} from '@/constants';

export default function useOauth() {
  const templateUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_DOMAIN}/oauth2/authorize?identity_provider=${PROVIDER_TAG}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_HOST_URL_AUTH}/sso&response_type=CODE&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=aws.cognito.signin.user.admin+openid+email+phone`;

  const googleUrl = templateUrl.replace(PROVIDER_TAG, PROVIDER_GOOGLE);
  const facebookUrl = templateUrl.replace(PROVIDER_TAG, PROVIDER_FACEBOOK);
  const appleUrl = templateUrl.replace(PROVIDER_TAG, PROVIDER_APPLE);

  return { googleUrl, facebookUrl, appleUrl };
}
