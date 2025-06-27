import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useMenuStore} from "../../store/MenuStore.ts";
import IconBack from "../icons/IconBack.tsx";
import type {MenuType, GlobalType} from "../../constants/types.ts";
import {ICON_STYLES} from "../../constants/values.ts";
import {useGlobalStore} from "../../store/GlobalStore.ts";

interface IProps {
  newState: MenuType | GlobalType;
  global?: boolean;
  className?: string;
}

const ButtonBack = ({newState, global, className}: IProps) => {
  const {t} = useTranslation('translations')
  const {change: changeMenu} = useMenuStore();
  const {change: changeGlobal} = useGlobalStore();

  return (
    <Button
      className={className}
      title={t('back')}
      onClick={() => {
        if (global) {
          changeGlobal(newState as GlobalType);
        } else {
          changeMenu(newState as MenuType);
        }
      }}
      textColorClass="text-red-500 hover:text-red-400"
      textGradientClass="from-rose-700"
      icon={<IconBack className={ICON_STYLES} />}
    />
  );
}

export default ButtonBack;