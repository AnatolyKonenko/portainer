import { rawResponse } from 'Kubernetes/rest/response/transform';

angular.module('portainer.kubernetes').factory('KubernetesServices', [
  '$resource',
  'API_ENDPOINT_ENDPOINTS',
  'EndpointProvider',
  function KubernetesServicesFactory($resource, API_ENDPOINT_ENDPOINTS, EndpointProvider) {
    'use strict';
    return function (namespace) {
      const url = API_ENDPOINT_ENDPOINTS + '/:endpointId/kubernetes/api/v1' + (namespace ? '/namespaces/:namespace' : '') + '/services/:id/:action';
      return $resource(
        url,
        {
          endpointId: EndpointProvider.endpointID,
          namespace: namespace,
        },
        {
          get: {
            method: 'GET',
            timeout: 15000,
            ignoreLoadingBar: true,
          },
          getYaml: {
            method: 'GET',
            headers: {
              Accept: 'application/yaml',
            },
            transformResponse: rawResponse,
            ignoreLoadingBar: true,
          },
          create: { method: 'POST' },
          update: { method: 'PUT' },
          patch: {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json-patch+json',
            },
          },
          delete: { method: 'DELETE' },
        }
      );
    };
  },
]);
