/** Tiny event bridge so a service row can preselect the booking form. */
export const SELECT_SERVICE_EVENT = "blackline:select-service";

export function selectService(serviceId: string) {
  window.dispatchEvent(
    new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceId }),
  );
}
