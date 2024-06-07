// import { DefaultCard } from './DefaultCard/DefaultCard'
// import { ErrorMSG } from './Error/ErrorMSG'
import { NotFound } from './NotFound/NotFound'
import style from './CardList.module.css'

export const CardList = () => {
  return (
    <div className={style['containerCardsList']}>
      {/* <ErrorMSG /> */}
      <NotFound />
      {/* <DefaultCard /> */}
    </div>
  )
}
