import { ValidationError, ValidationSeverity } from 'vanilla-jsoneditor';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDivKit(json: any): ValidationError[] {
  const errors = [] as ValidationError[]

  // skip check if object not set
  if (!json) {
    return errors
  }

  if (!('templates' in json)) {
    errors.push({
      path: [],
      message: 'Required property "templates" missing',
      severity: ValidationSeverity.error
    })
  }

  if (!('card' in json)) {
    errors.push({
      path: [],
      message: 'Required property "card" missing',
      severity: ValidationSeverity.error
    })
  }

  return errors
}