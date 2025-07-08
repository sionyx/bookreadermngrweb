'use client'

import dynamic from 'next/dynamic'
//import { VKIDWrapper } from "@/components/VKIDWrapper";
//import { Config, OneTap } from '@vkid/sdk';
//import { LoginVKID } from  "@elum/vkid";
const VKIDWrapper = dynamic(() => import("@/components/VKIDWrapper").then((mod) => mod.VKIDWrapper), { ssr: false })
//const LoginVKID = dynamic(() => import("@elum/vkid").then((mod) => mod.LoginVKID), { ssr: false })

// let config = Config.init({
//   app: 52749643, // Идентификатор приложения.
//   redirectUrl: 'https://sionyx.dev/auth_redirect', // Адрес для перехода после авторизации.
//   state: 'auth', // Произвольная строка состояния приложения.
//   //codeChallenge: '<ваш сгенерированный code_challenge>', // codeVerifier, преобразованный по алгоритму S256. Представялет собой случайную строку. Обеспечивает защиту передаваемых данных.
//   scope: 'email phone', // Список прав доступа, которые нужны приложению.
// });

export default function Home() {
  return (
    <>
    <VKIDWrapper />
		{/* <LoginVKID style={{ height: 852 }}
			id={52749643}
			redirect={"https://sionyx.dev/auth_redirect"}
			state={"any_data"}
			showAgreements
			showAgreementsDialog
			//showAlternativeLogin
			radius={8}
			height={40}
			mode={"default"}
			skin={"primary"}
			scheme={"bright_light"}
			language={0}
			settings={{
				agreements: '',
				promo: '',
				vkc_behavior: '',
				vkc_auth_action: '',
				vkc_brand: '',
				vkc_display_mode: '',
			}}
			//authAlternative={() =>  console.log("Альтернативная авторизация")}
			authSuccess={(data) =>  console.log(data)}
		/> */}
    </>
  );
}

/* <div>
<script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
<script type="text/javascript">
  if ('VKIDSDK' in window) {
    const VKID = window.VKIDSDK;

    VKID.Config.init({
      app: 52749643,
      redirectUrl: 'https://sionyx.dev/auth_redirect',
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
    });

    const oneTap = new VKID.OneTap();

    oneTap.render({
      container: document.currentScript.parentElement,
      showAlternativeLogin: true
    })
    .on(VKID.WidgetEvents.ERROR, vkidOnError)
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
      const code = payload.code;
      const deviceId = payload.device_id;

      VKID.Auth.exchangeCode(code, deviceId)
        .then(vkidOnSuccess)
        .catch(vkidOnError);
    });
  
    function vkidOnSuccess(data) {
      // Обработка полученного результата
    }
  
    function vkidOnError(error) {
      // Обработка ошибки
    }
  }
</script>
</div>; */
