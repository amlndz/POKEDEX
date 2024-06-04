// import { DefaultCard } from './DefaultCard/DefaultCard';
import style from './CardList.module.css'
import { ErrorMSG } from './Error/ErrorMSG'

export const CardList = () => {
  return (
    <div className={style['containerCardsList']}>
      <ErrorMSG />
    </div>
  )
}
