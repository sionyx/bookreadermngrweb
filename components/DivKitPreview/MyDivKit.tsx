import React from 'react';
import { render, createVariable, createGlobalVariablesController } from '@divkitframework/divkit/client-hydratable';


export interface DivKitVariables {
  screen_width: number
  screen_height: number
  safearea_top: number
  safearea_bottom: number
  is_landscape: boolean
  is_tablet: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MyDivKit(props: any) {
  const ref = React.useRef(null);

  const safearea_top = createVariable('safeAreaTop', 'integer', 47)
  const safearea_bottom = createVariable('safeAreaBottom', 'integer', 34)
  const screen_width = createVariable('screenWidth', 'integer', 400)
  const screen_height = createVariable('screenHeight', 'integer', 896)
  const interface_orientation_isLandscape = createVariable('isLandscape', 'boolean', false)
  const is_tablet = createVariable('isTablet', 'boolean', false)

  const controller = createGlobalVariablesController()
  controller.setVariable(safearea_top)
  controller.setVariable(safearea_bottom)
  controller.setVariable(screen_width)
  controller.setVariable(screen_height)
  controller.setVariable(interface_orientation_isLandscape)
  controller.setVariable(is_tablet)


  React.useEffect(() => {
    if (ref.current) {

      const instance = render({
        ...props,
        platform: 'touch',
        target: ref.current,
        hydrate: true, 
        globalVariablesController: controller,
        mix: 'w-100'
      });

      const variables = props.variables as DivKitVariables
      if (variables) { 
        screen_width.setValue(variables.screen_width) 
        screen_height.setValue(variables.screen_height)
        safearea_top.setValue(variables.safearea_top) 
        safearea_bottom.setValue(variables.safearea_bottom)
        interface_orientation_isLandscape.setValue(variables.is_landscape ? 1 : 0) 
        is_tablet.setValue(variables.is_tablet ? 1 : 0)
      }

      return () => instance.$destroy();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props ]);

  return <div ref={ref} style={{ minHeight: '100%', minWidth: '100%', display: 'flex' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: '' }} />;
}