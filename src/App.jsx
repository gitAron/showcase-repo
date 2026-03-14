import { useState } from 'react'

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: '#3d2b2b',
    background: '#fdf8f6',
    margin: 0,
    padding: 0,
  },
  nav: {
    background: 'rgba(253,248,246,0.97)',
    borderBottom: '1px solid #e8d5cf',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '0 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
  },
  navLogo: {
    fontSize: '1.1rem',
    fontWeight: '600',
    letterSpacing: '0.08em',
    color: '#7a3e48',
    textTransform: 'uppercase',
  },
  navLinks: {
    display: 'flex',
    gap: '36px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    fontSize: '0.82rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#5a3a3a',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    padding: '100px 48px',
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%',
  },
  heroWrap: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
  },
  heroBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: 'url(/showcase-repo/hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.40)',
    zIndex: 0,
  },
  heroLeft: {
    flex: '1',
    textAlign: 'left',
  },
  heroImg: {
    flex: '1',
    borderRadius: '24px',
    overflow: 'hidden',
    maxHeight: '480px',
    boxShadow: '0 20px 60px rgba(122,62,72,0.15)',
  },
  heroEyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#f0c8d8',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '3.2rem',
    fontWeight: '400',
    lineHeight: 1.25,
    color: '#ffffff',
    margin: '0 0 24px',
    maxWidth: '700px',
    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#f0e0e6',
    maxWidth: '520px',
    margin: '0 0 40px',
    fontStyle: 'italic',
  },
  heroBtns: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#7a3e48',
    color: '#fff',
    border: 'none',
    padding: '14px 36px',
    borderRadius: '30px',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  btnOutline: {
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid #fff',
    padding: '14px 36px',
    borderRadius: '30px',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '48px 48px 0',
  },
  dividerLine: {
    height: '1px',
    width: '80px',
    background: '#d4a8b4',
  },
  dividerDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#d4a8b4',
  },
  section: {
    padding: '80px 48px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#a0607a',
    marginBottom: '12px',
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: '2rem',
    fontWeight: '400',
    color: '#3d1f2f',
    textAlign: 'center',
    marginBottom: '48px',
    margin: '0 auto 52px',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  serviceCard: {
    background: '#fff',
    border: '1px solid #ead5d8',
    borderRadius: '16px',
    padding: '36px 28px',
    transition: 'box-shadow 0.2s',
  },
  serviceIcon: {
    fontSize: '1.6rem',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#3d1f2f',
    marginBottom: '10px',
    letterSpacing: '0.03em',
  },
  serviceText: {
    fontSize: '0.88rem',
    lineHeight: 1.75,
    color: '#7a5560',
  },
  aboutSection: {
    background: 'linear-gradient(135deg, #f3e0e8 0%, #ede8f5 100%)',
    padding: '80px 48px',
  },
  aboutInner: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '64px',
    alignItems: 'center',
  },
  aboutLeft: {},
  aboutEyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#a0607a',
    marginBottom: '12px',
  },
  aboutHeading: {
    fontSize: '2rem',
    fontWeight: '400',
    color: '#3d1f2f',
    marginBottom: '20px',
    lineHeight: 1.3,
  },
  aboutText: {
    fontSize: '0.92rem',
    lineHeight: 1.9,
    color: '#6b4555',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    border: '1px solid rgba(212,168,180,0.4)',
  },
  statNum: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#7a3e48',
    display: 'block',
  },
  statLabel: {
    fontSize: '0.78rem',
    color: '#7a5560',
    letterSpacing: '0.05em',
    marginTop: '4px',
  },
  teamSection: {
    padding: '80px 48px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '28px',
  },
  teamCard: {
    background: '#fff',
    border: '1px solid #ead5d8',
    borderRadius: '16px',
    padding: '36px 24px',
    textAlign: 'center',
  },
  teamAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f3e0e8, #d4a8b4)',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
  },
  teamName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#3d1f2f',
    marginBottom: '6px',
  },
  teamRole: {
    fontSize: '0.82rem',
    color: '#a0607a',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  teamBio: {
    fontSize: '0.83rem',
    lineHeight: 1.7,
    color: '#7a5560',
  },
  infoStrip: {
    background: '#7a3e48',
    color: '#fff',
    padding: '56px 48px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '100%',
  },
  infoBlock: {
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.7,
    marginBottom: '10px',
  },
  infoValue: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
  },
  contactSection: {
    padding: '80px 48px',
    background: '#fdf8f6',
  },
  contactInner: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  contactForm: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left',
  },
  input: {
    padding: '14px 18px',
    border: '1px solid #ead5d8',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: '#3d2b2b',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '14px 18px',
    border: '1px solid #ead5d8',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: '#3d2b2b',
    background: '#fff',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
  },
  footer: {
    background: '#3d1f2f',
    color: '#c9a8b4',
    textAlign: 'center',
    padding: '32px 48px',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
  },
}

const services = [
  {
    icon: '🔬',
    title: 'Gastroskopie',
    text: 'Schonende Magenspiegelung zur Diagnostik von Beschwerden im oberen Verdauungstrakt, einschließlich Gewebeentnahme.',
  },
  {
    icon: '🩺',
    title: 'Koloskopie',
    text: 'Darmspiegelung zur Früherkennung von Darmkrebs, Polypenentfernung und Diagnostik entzündlicher Darmerkrankungen.',
  },
  {
    icon: '💊',
    title: 'Chronisch entzündliche Darmerkrankungen',
    text: 'Spezialisierte Betreuung bei Morbus Crohn und Colitis ulcerosa – medikamentös, biopsychosozial und langfristig.',
  },
  {
    icon: '🫁',
    title: 'Lebererkrankungen',
    text: 'Diagnostik und Therapie von Fettleber, Hepatitis sowie regelmäßige Verlaufskontrollen bei chronischen Lebererkrankungen.',
  },
  {
    icon: '🧫',
    title: 'H. pylori Diagnostik & Therapie',
    text: 'Nachweis und Eradikation von Helicobacter pylori durch gezielte antibiotische Therapieschemata.',
  },
  {
    icon: '📋',
    title: 'Vorsorge & Check-up',
    text: 'Individuelle Vorsorgeuntersuchungen ab 50 Jahren sowie Beratung zu Risikofaktoren und gesunder Ernährung.',
  },
  {
    icon: '🔵',
    title: 'Hämorrhoidenbehandlung',
    text: 'Ambulante Therapie von Hämorrhoiden mittels Sklerosierung oder Gummibandligatur – schonend und effektiv.',
  },
  {
    icon: '🌿',
    title: 'Ernährungsberatung',
    text: 'Ganzheitliche Beratung bei Nahrungsmittelunverträglichkeiten, Reizdarm und nach gastroenterologischen Eingriffen.',
  },
  {
    icon: '💉',
    title: 'Infusionstherapie',
    text: 'Ambulante Infusionsbehandlungen für Biologika und andere moderne Therapien bei chronischen Erkrankungen.',
  },
]

const team = [
  {
    name: 'Dr. med. Katya',
    role: 'Fachärztin für Gastroenterologie & Innere Medizin',
    bio: 'Praxisinhaberin und erfahrene Gastroenterologin. Ihr Fokus liegt auf modernster Endoskopie und der ganzheitlichen Betreuung ihrer Patientinnen und Patienten.',
  },
  {
    name: 'Dr. med. Clara Hoffmann',
    role: 'Fachärztin für Gastroenterologie',
    bio: 'Spezialisierung auf chronisch entzündliche Darmerkrankungen und endoskopische Diagnostik. Über 15 Jahre Erfahrung.',
  },
  {
    name: 'Dr. med. Sophie Brandt',
    role: 'Fachärztin für Innere Medizin',
    bio: 'Schwerpunkt Hepatologie und Ernährungsmedizin. Einfühlsame Begleitung bei chronischen Lebererkrankungen.',
  },
  {
    name: 'Laura Meier',
    role: 'Medizinische Fachangestellte',
    bio: 'Leiterin der Endoskopie-Abteilung. Ihr freundliches Team sorgt für eine angenehme Atmosphäre.',
  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={styles.root}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>Praxis Katya</span>
        <ul style={styles.navLinks}>
          {[['Leistungen', 'services'], ['Über uns', 'about'], ['Team', 'team'], ['Kontakt', 'contact']].map(([label, id]) => (
            <li key={id}>
              <a style={styles.navLink} onClick={() => scrollTo(id)} href={'#' + id}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <div style={styles.heroWrap}>
        <div style={styles.heroBg} />
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <p style={styles.heroEyebrow}>Gastroenterologie &amp; Innere Medizin · Hannover</p>
            <h1 style={styles.heroTitle}>Ihre Gesundheit liegt uns am Herzen.</h1>
            <p style={styles.heroSubtitle}>
              Wir begleiten Sie mit Empathie, Expertise und moderner Medizin durch jeden Schritt Ihrer Behandlung.
            </p>
            <div style={styles.heroBtns}>
              <button style={styles.btnPrimary} onClick={() => scrollTo('contact')}>Termin vereinbaren</button>
              <button style={styles.btnOutline} onClick={() => scrollTo('services')}>Unsere Leistungen</button>
            </div>
          </div>
        </section>
      </div>

      {/* Divider */}
      <div style={styles.divider}>
        <div style={styles.dividerLine} />
        <div style={styles.dividerDot} />
        <div style={styles.dividerLine} />
      </div>

      {/* Services */}
      <section id="services" style={styles.section}>
        <p style={styles.sectionTitle}>Was wir für Sie tun</p>
        <h2 style={{ ...styles.sectionHeading, marginTop: '8px' }}>Unsere Leistungen</h2>
        <div style={styles.servicesGrid}>
          {services.map((s) => (
            <div key={s.title} style={styles.serviceCard}>
              <div style={styles.serviceIcon}>{s.icon}</div>
              <h3 style={styles.serviceTitle}>{s.title}</h3>
              <p style={styles.serviceText}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <div style={styles.aboutLeft}>
            <p style={styles.aboutEyebrow}>Über unsere Praxis</p>
            <h2 style={styles.aboutHeading}>Moderne Medizin mit menschlicher Wärme</h2>
            <p style={styles.aboutText}>
              Unsere Gemeinschaftspraxis verbindet höchste medizinische Standards mit einer persönlichen,
              wertschätzenden Betreuung. Wir nehmen uns Zeit für Ihre Fragen und erklären jeden Schritt
              Ihrer Diagnostik und Therapie verständlich und transparent.
            </p>
            <p style={{ ...styles.aboutText, marginTop: '16px' }}>
              Mit modernster Endoskopietechnik und einem erfahrenen, eingespielten Team bieten wir Ihnen
              die gesamte gastroenterologische Diagnostik und Therapie aus einer Hand – ambulant,
              schonend und auf dem neuesten Stand der Wissenschaft.
            </p>
          </div>
          <div style={styles.statsGrid}>
            {[
              ['15+', 'Jahre Erfahrung'],
              ['4.800+', 'Patientinnen & Patienten'],
              ['9', 'Spezialleistungen'],
              ['2', 'Fachärztinnen'],
            ].map(([num, label]) => (
              <div key={label} style={styles.statCard}>
                <span style={styles.statNum}>{num}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" style={styles.teamSection}>
        <p style={styles.sectionTitle}>Unser Team</p>
        <h2 style={{ ...styles.sectionHeading, marginTop: '8px' }}>In guten Händen</h2>
        <div style={styles.teamGrid}>
          {team.map((m) => (
            <div key={m.name} style={styles.teamCard}>
              <div style={styles.teamAvatar}>👩‍⚕️</div>
              <h3 style={styles.teamName}>{m.name}</h3>
              <p style={styles.teamRole}>{m.role}</p>
              <p style={styles.teamBio}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Strip */}
      <div style={styles.infoStrip}>
        {[
          ['Sprechzeiten', 'Mo – Fr: 08:00 – 17:00 Uhr\nTermine nach Vereinbarung'],
          ['Adresse', 'Auf dem Loh\n30167 Hannover'],
          ['Telefon & E-Mail', '+49 30 123 456 78\npraxis@hoffmann-brandt.de'],
          ['Kassenärztlich', 'Alle gesetzlichen\nKrankenkassen'],
        ].map(([label, value]) => (
          <div key={label} style={styles.infoBlock}>
            <p style={styles.infoLabel}>{label}</p>
            <p style={styles.infoValue}>{value}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.contactInner}>
          <p style={styles.sectionTitle}>Kontakt</p>
          <h2 style={{ ...styles.sectionHeading, marginTop: '8px' }}>Termin vereinbaren</h2>
          <p style={{ fontSize: '0.9rem', color: '#7a5560', lineHeight: 1.8, fontStyle: 'italic' }}>
            Schreiben Sie uns – wir melden uns innerhalb eines Werktages bei Ihnen.
          </p>
          {sent ? (
            <div style={{ marginTop: '40px', padding: '28px', background: '#f3e8ec', borderRadius: '12px', color: '#7a3e48' }}>
              Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen. 🌸
            </div>
          ) : (
            <form style={styles.contactForm} onSubmit={handleSubmit}>
              <input
                style={styles.input}
                placeholder="Ihr Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                style={styles.input}
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <textarea
                style={styles.textarea}
                placeholder="Ihr Anliegen / Terminwunsch..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
              <button type="submit" style={{ ...styles.btnPrimary, alignSelf: 'flex-start' }}>
                Nachricht senden
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Praxis Katya · Gastroenterologie &amp; Innere Medizin · Hannover</p>
        <p style={{ marginTop: '8px', opacity: 0.6 }}>Impressum · Datenschutz · Barrierefreiheit</p>
      </footer>
    </div>
  )
}

export default App
