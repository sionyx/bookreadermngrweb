import {
  createJSONEditor,
  JSONEditorPropsOptional,
  JsonEditor,
} from 'vanilla-jsoneditor';
import { useEffect, useRef } from 'react';
import './VanillaJSONEditor.css';
import { useHotkeys } from 'react-hotkeys-hook';

interface DivJSONEditorPropsOptional extends JSONEditorPropsOptional {
  onSave: () => void;
}

export default function SvelteJSONEditor(props: DivJSONEditorPropsOptional) {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const refEditor = useRef<JsonEditor | null>(null);
  const refPrevProps = useRef<JSONEditorPropsOptional>(props);

  useHotkeys('meta+s', () => props.onSave(), { enableOnContentEditable: true, preventDefault: true });

  useEffect(() => {
    // create editor
    console.log('create editor', refContainer.current);
    refEditor.current = createJSONEditor({
      target: refContainer.current as HTMLDivElement,
      props,
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        console.log('destroy editor');
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  // тут props добавлять нельзя
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      // only pass the props that actually changed
      // since the last time to prevent syncing issues
      const changedProps = filterUnchangedProps(props, refPrevProps.current);
      console.log('update props', changedProps);
      refEditor.current.updateProps(changedProps);
      refPrevProps.current = props;
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer} style={{ height: 768 }}></div>;
}

function filterUnchangedProps(
  props: JSONEditorPropsOptional,
  prevProps: JSONEditorPropsOptional
): JSONEditorPropsOptional {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key, value]) =>
        value !== prevProps[key as keyof JSONEditorPropsOptional]
    )
  );
}
