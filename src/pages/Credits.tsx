import { useLanguage } from '../i18n/context'

export default function Credits() {
  const { t } = useLanguage()

  return (
    <section style={{ padding: '4rem 0' }}>
      <h2 className="section-title">{t('credits.title')}</h2>

      <div className="credits-body">
        <h3>{t('credits.inspirationHeading')}</h3>
        <p>{t('credits.inspirationBody')}</p>
      </div>

      <p className="credits-footer">
        {t('credits.footer')}
      </p>
    </section>
  )
}
