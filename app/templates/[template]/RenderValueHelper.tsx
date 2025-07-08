import { RenderValueProps, RenderValueComponentDescription, EnumValue, renderValue } from 'vanilla-jsoneditor';


const orientationOptions = [
  { value: 'vertical', text: 'vertical' },
  { value: 'horizontal', text: 'horizontal' },
  { value: 'overlap', text: 'overlap' }
]

const sizeOptions = [
  { value: 'fixed', text: 'fixed' },
  { value: 'match_parent', text: 'match_parent' },
  { value: 'wrap_content', text: 'wrap_content' }
]

const contentAlignmentHorizontalOptions = [
  { value: 'left', text: 'left' },
  { value: 'center', text: 'center' },
  { value: 'right', text: 'right' },
  { value: 'start', text: 'start' },
  { value: 'end', text: 'end' },
  { value: 'space-between', text: 'space-between' },
  { value: 'space-around', text: 'space-around' },
  { value: 'space-evenly', text: 'space-evenly' }
]

const contentAlignmentVerticalOptions = [
  { value: 'top', text: 'top' },
  { value: 'center', text: 'center' },
  { value: 'bottom', text: 'bottom' },
  { value: 'baseline', text: 'baseline' },
  { value: 'space-between', text: 'space-between' },
  { value: 'space-around', text: 'space-around' },
  { value: 'space-evenly', text: 'space-evenly' }
]

const textAlignmentHorizontalOptions = [
  { value: 'left', text: 'left' },
  { value: 'center', text: 'center' },
  { value: 'right', text: 'right' },
  { value: 'start', text: 'start' },
  { value: 'end', text: 'end' }
]

const textAlignmentVerticalOptions = [
  { value: 'top', text: 'top' },
  { value: 'center', text: 'center' },
  { value: 'bottom', text: 'bottom' },
  { value: 'baseline', text: 'baseline' }
]

const variablesTypesOptions = [
  { value: 'boolean', text: 'boolean' },
  { value: 'string', text: 'string' },
  { value: 'integer', text: 'integer' },
  { value: 'number', text: 'number' },
  { value: 'color', text: 'color' },
  { value: 'url', text: 'url' },
  { value: 'dict', text: 'dict' },
  { value: 'array', text: 'array' }
]


export function onRenderValue(props: RenderValueProps): RenderValueComponentDescription[] {
  const key = props.path[props.path.length - 1]
  const parent = props.path.length > 2 ? props.path[props.path.length - 2] : ''
  // if (key === 'password' && !props.isEditing) {
  //   return [{ component: ReadonlyPassword, props }]
  // }

  if (key === 'orientation') {
    return [ { component: EnumValue, props: { ...props, options: orientationOptions }}]
  }
  if (key === 'content_alignment_horizontal') {
    return [ { component: EnumValue, props: { ...props, options: contentAlignmentHorizontalOptions }}]
  }
  if (key === 'content_alignment_vertical') {
    return [ { component: EnumValue, props: { ...props, options: contentAlignmentVerticalOptions }}]
  }
  if (key === 'text_alignment_horizontal') {
    return [ { component: EnumValue, props: { ...props, options: textAlignmentHorizontalOptions }}]
  }
  if (key === 'text_alignment_vertical') {
    return [ { component: EnumValue, props: { ...props, options: textAlignmentVerticalOptions }}]
  }


  if (key === 'type') {
    if (parent === 'width' || parent === 'height') {
      return [ { component: EnumValue, props: { ...props, options: sizeOptions }}]
    }
    if (props.path.length > 3 && props.path[props.path.length - 3] == 'variables') {
      return [ { component: EnumValue, props: { ...props, options: variablesTypesOptions }}]
    }
  }


  


  // if (key === 'evaluate' && !props.isEditing) {
  //   return [{ action: EvaluatorAction, props }]
  // }

  // fallback on the default render components
  return renderValue(props)
} 
