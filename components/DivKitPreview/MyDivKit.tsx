import React from 'react';
import { render, createVariable, createGlobalVariablesController } from '@divkitframework/divkit/client-hydratable';


export interface DivKitVariables {
  user_name: string
  user_email: string
  is_pro_status: boolean
  qouta_used: string
  qouta_available: string
  qouta_total: string
  has_tariff_promo: boolean
  is_auto_upload: boolean
  app_locker_enabled: boolean

  screen_width: number
  screen_height: number
  safeArea_inset_top: number
  safeArea_inset_bottom: number
  interface_orientation_isLandscape: boolean
  is_iPad: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MyDivKit(props: any) {
  const ref = React.useRef(null);

  const user_name = createVariable('user_name', 'string', '')
  const user_email = createVariable('user_email', 'string', '')
  const is_pro_status = createVariable('is_pro_status', 'boolean', false)
  const qouta_used = createVariable('qouta_used', 'string', '')
  const qouta_available = createVariable('qouta_available', 'string', '')
  const qouta_total = createVariable('qouta_total', 'string', '')
  const has_tariff_promo = createVariable('has_tariff_promo', 'boolean', false)
  const is_auto_upload = createVariable('is_auto_upload', 'boolean', false)
  const app_locker_enabled = createVariable('app_locker_enabled', 'boolean', false)
  const locale = createVariable('locale', 'string', 'ru')

  const safeArea_inset_top = createVariable('safeArea_inset_top', 'integer', 47)
  const safeArea_inset_bottom = createVariable('safeArea_inset_bottom', 'integer', 34)
  const screen_width = createVariable('screen_width', 'integer', 400)
  const screen_height = createVariable('screen_height', 'integer', 896)
  const interface_orientation_isLandscape = createVariable('interface_orientation_isLandscape', 'boolean', false)
  const is_iPad = createVariable('is_iPad', 'boolean', false)

  //android flavour
  const safe_area_inset_top = createVariable('safe_area_inset_top', 'integer', 47)
  const safe_area_inset_bottom = createVariable('safe_area_inset_bottom', 'integer', 34)
  const interface_orientation_is_landscape = createVariable('interface_orientation_is_landscape', 'boolean', false)
  const is_tablet = createVariable('is_tablet', 'boolean', false)

  const controller = createGlobalVariablesController()
  controller.setVariable(user_name)
  controller.setVariable(user_email)
  controller.setVariable(is_pro_status)
  controller.setVariable(qouta_used)
  controller.setVariable(qouta_available)
  controller.setVariable(qouta_total)
  controller.setVariable(has_tariff_promo)
  controller.setVariable(is_auto_upload)
  controller.setVariable(app_locker_enabled)
  controller.setVariable(locale)

  controller.setVariable(safeArea_inset_top)
  controller.setVariable(safeArea_inset_bottom)
  controller.setVariable(screen_width)
  controller.setVariable(screen_height)
  controller.setVariable(interface_orientation_isLandscape)
  controller.setVariable(is_iPad)

  controller.setVariable(safe_area_inset_top)
  controller.setVariable(safe_area_inset_bottom)
  controller.setVariable(interface_orientation_is_landscape)
  controller.setVariable(is_tablet)


  React.useEffect(() => {
    if (ref.current) {

      const instance = render({
        ...props,
        platform: 'touch',
        target: ref.current,
        hydrate: true, 
        globalVariablesController: controller
      });

      const variables = props.variables as DivKitVariables
      if (variables) { 
        user_name.setValue(variables.user_name) 
        user_email.setValue(variables.user_email) 
        is_pro_status.setValue(variables.is_pro_status ? 1 : 0) 
        qouta_used.setValue(variables.qouta_used) 
        qouta_available.setValue(variables.qouta_available) 
        qouta_total.setValue(variables.qouta_total) 
        has_tariff_promo.setValue(variables.has_tariff_promo ? 1 : 0) 
        is_auto_upload.setValue(variables.is_auto_upload ? 1 : 0) 
        app_locker_enabled.setValue(variables.app_locker_enabled ? 1 : 0) 
  
        screen_width.setValue(variables.screen_width) 
        screen_height.setValue(variables.screen_height)
        safeArea_inset_top.setValue(variables.safeArea_inset_top) 
        safeArea_inset_bottom.setValue(variables.safeArea_inset_bottom)
        interface_orientation_isLandscape.setValue(variables.interface_orientation_isLandscape ? 1 : 0) 
        is_iPad.setValue(variables.is_iPad ? 1 : 0)
  
        safe_area_inset_top.setValue(variables.safeArea_inset_top) 
        safe_area_inset_bottom.setValue(variables.safeArea_inset_bottom)
        interface_orientation_is_landscape.setValue(variables.interface_orientation_isLandscape ? 1 : 0) 
        is_tablet.setValue(variables.is_iPad ? 1 : 0)
      }

      return () => instance.$destroy();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props ]);

  return <div ref={ref} style={{ minHeight: '100%', minWidth: '100%', display: 'flex' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: '' }} />;
}