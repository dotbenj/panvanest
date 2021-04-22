import { Injectable } from '@nestjs/common';
import { Provider } from 'oidc-provider';

@Injectable()
export class AppService {
  parseJsonProperty(input: any, propertyName: string): string | any {
    if (!(propertyName in input)) {
      throw TypeError(
        `property "${propertyName}" does not exists on object: ${JSON.stringify(
          input,
        )}`,
      );
    }

    try {
      return JSON.parse(input[propertyName]);
    } catch (error) {
      throw TypeError(
        `property "${propertyName}" is not JSON parsable, value was: ${input[propertyName]}`,
      );
    }
  }

  getHello(): string {
    const config = {
      routes: {
        authorization: '/authorize',
        check_session: '/session/check',
        code_verification: '/device',
        device_authorization: '/device/auth',
        end_session: '/session/end',
        introspection: '/token/introspection',
        jwks: '/jwks',
        pushed_authorization_request: '/request',
        registration: '/reg',
        revocation: '/token/revocation',
        token: '/token',
        userinfo: '/userinfo',
      },
      subjectTypes: ['pairwise'],
      cookies: {
        keys: this.parseJsonProperty(process.env, 'OIDC_PROVIDER_COOKIES_KEYS'),
        long: {
          maxAge: 600000,
          sameSite: 'lax',
          signed: true,
          path: '/',
        },
        short: {
          maxAge: 600000,
          sameSite: 'lax',
          signed: true,
          path: '/',
        },
      },
      grant_types_supported: ['authorization_code'],
      features: {
        devInteractions: { enabled: false },
        encryption: { enabled: true },
        jwtUserinfo: { enabled: true },
        backchannelLogout: { enabled: true },
        revocation: { enabled: true },
        claimsParameter: { enabled: true },
      },
      acceptQueryParamAccessTokens: true,
      ttl: {
        AccessToken: 60,
        AuthorizationCode: 30,
        IdToken: 60,
      },
      scopes: ['openid'],
      claims: {
        openid: ['sub'],
        birthdate: ['birthdate'],
        given_name: ['given_name'],
        family_name: ['family_name'],
      },
      clientDefaults: {
        grant_types: ['authorization_code'],
        id_token_signed_response_alg: 'ES256',
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post',
        revocation_endpoint_auth_method: 'client_secret_post',
        application_type: 'web',
      },
      responseTypes: ['code'],
      revocationEndpointAuthMethods: ['client_secret_post', 'private_key_jwt'],
      tokenEndpointAuthMethods: ['client_secret_post', 'private_key_jwt'],
      whitelistedJWA: {
        authorizationEncryptionAlgValues: ['ECDH-ES', 'RSA-OAEP'],
        authorizationEncryptionEncValues: ['A256GCM'],
        authorizationSigningAlgValues: ['ES256'],
        dPoPSigningAlgValues: ['ES256'],
        idTokenEncryptionAlgValues: ['ECDH-ES', 'RSA-OAEP'],
        idTokenEncryptionEncValues: ['A256GCM'],
        idTokenSigningAlgValues: ['ES256'],
        introspectionEncryptionAlgValues: ['ECDH-ES', 'RSA-OAEP'],
        introspectionEncryptionEncValues: ['A256GCM'],
        introspectionEndpointAuthSigningAlgValues: ['ES256'],
        introspectionSigningAlgValues: ['ES256'],
        requestObjectEncryptionAlgValues: ['ECDH-ES', 'RSA-OAEP'],
        requestObjectEncryptionEncValues: ['A256GCM'],
        requestObjectSigningAlgValues: ['ES256'],
        revocationEndpointAuthSigningAlgValues: ['ES256'],
        tokenEndpointAuthSigningAlgValues: ['ES256'],
        userinfoEncryptionAlgValues: ['ECDH-ES', 'RSA-OAEP'],
        userinfoEncryptionEncValues: ['A256GCM'],
        userinfoSigningAlgValues: ['ES256'],
      },
      jwks: {
        keys: [this.parseJsonProperty(process.env, 'CRYPTO_SIG_FAKE_PRIV_KEY')],
      },

      timeout: parseInt(process.env.REQUEST_TIMEOUT, 10),
    };

    const oidc = new Provider('http://localhost:3000', config);

    oidc.callback();
    return 'Hello World!';
  }
}
