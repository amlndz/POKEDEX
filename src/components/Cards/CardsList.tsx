import { DefaultCard } from './DefaultCard/DefaultCard'
// import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'

export const CardList = () => {
  return (
    <div className={style['containerCardsList']}>
      {/* <ErrorMSG /> */}
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
    </div>
  )
}
