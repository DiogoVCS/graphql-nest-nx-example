/**
 * Retrieves the value of the enum from the representing string.
 * @param enm type of the enum
 * @param value string value of the enum
 * @private
 */
export const enumFromStringValue = <T>(enm: { [s: string]: T }, value: string): T | undefined => (Object.values(enm) as unknown as string[]).includes(value) ? (value as unknown as T) : undefined;
