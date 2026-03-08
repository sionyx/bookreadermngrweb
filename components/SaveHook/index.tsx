import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
interface ISaveHookProps {
  onSave: () => void;
}
export const SaveHook = (props: ISaveHookProps) => {
  useHotkeys('meta+s', () => props.onSave(), { enableOnFormTags: true, preventDefault: true });
  return <></>;
};