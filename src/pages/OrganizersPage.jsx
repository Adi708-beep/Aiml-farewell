import EvilEye from '../components/EvilEye.jsx';
import Nav from '../components/Nav.jsx';
import OrganizerCard from '../components/organizers/OrganizerCard.jsx';
import './OrganizersPage.css';

const sectionData = [
  {
    title: 'EVENT TEAM',
    subtitle: 'Designing the pulse, moments, and memories of the night.',
    accent: '#ff2a2a',
    accentSoft: 'rgba(255, 42, 42, 0.28)',
    members: [
      {
        name: 'ADITYA SAHA',
        role: 'EVENT LEAD',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQFNIpM5V18bpQ/feedshare-shrink_800/B56Z1keINyJYAc-/0/1775507113042?e=1776902400&v=beta&t=2O4powMmQgbWUHW5GJbgu0Y1gIumsrZOTfBah6JTiOY'
      },
      {
        name: 'KUNAL MITRA',
        role: 'MUSIC LEAD',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQGQdMc2wmDX4g/feedshare-shrink_800/B56Z1kebmAI8Ag-/0/1775507192458?e=1776902400&v=beta&t=9rU5lujWQPcNiDa0mwp4TFC63K5OitduWQr30sZwf5g'
      },
      {
        name: 'SUDESHNA PAUL',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQHzuQTYAiPP8Q/feedshare-shrink_1280/B56Z1mqkdvHoAM-/0/1775543928973?e=1776902400&v=beta&t=qJnBBL5ieHndH6X0HZhy_caXdousSv8dpEmZEW6MsuA'
      },
      {
        name: 'ASHMITA CHAKRABORTY',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQH3NUaTWkbhbg/feedshare-shrink_800/B56Z1mp_VtHoAc-/0/1775543776865?e=1776902400&v=beta&t=lvZ_mFd35HHBxxMd6eexttvjss_jAqWgPfvAeqJAVok'
      },
      {
        name: 'SK SHAHANUL HAQUE',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQGhDsdX-Mgv1g/feedshare-shrink_800/B56Z1mqViYKsAc-/0/1775543867834?e=1776902400&v=beta&t=Gz-3_qltwktzwMulvShxTi8WnJ06UlgFCcPWsnVrU5Q'
      }
    ]
  },
  {
    title: 'FINANCE TEAM',
    subtitle: 'Structuring every detail with precision and accountability.',
    accent: '#ffd166',
    accentSoft: 'rgba(255, 209, 102, 0.24)',
    members: [
      {
        name: 'SUDESHNA PAUL',
        role: 'FINANCE CORE',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQHzuQTYAiPP8Q/feedshare-shrink_1280/B56Z1mqkdvHoAM-/0/1775543928973?e=1776902400&v=beta&t=qJnBBL5ieHndH6X0HZhy_caXdousSv8dpEmZEW6MsuA'
      },
      {
        name: 'AYAN PAL',
        role: 'FINANCE CORE',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQFaG0Y6Kg9U9g/feedshare-shrink_1280/B56Z1nAKDYKYAQ-/0/1775549587926?e=1776902400&v=beta&t=kTui3-mcpkDu3gqwYYFL81rRWOrrUrpqdwkOMfnPF14'
      },
      {
        name: 'KRISHNA KANTA RANA',
        role: 'FINANCE CORE',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQFBUlwpzoKMmg/feedshare-shrink_480/B56Z1mrEyuIAAk-/0/1775544061411?e=1776902400&v=beta&t=C45kGVcMdYfwITLEkOK-KSTiaPyv36pDD-DYMP5Z_cA'
      },
      {
        name: 'MISBAHUL HODA',
        role: 'FINANCE CORE',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQHJEG7CemuE0w/feedshare-shrink_480/B56Z1mrTN0KAAk-/0/1775544120394?e=1776902400&v=beta&t=YPpgO53xcubYEeCnLwM8IFDm1In4Dlf0sdpp52PQcxM'
      }
    ]
  },
  {
    title: 'MANAGEMENT AND OPERATION TEAM',
    subtitle: 'Executing decor, logistics, and ground coordination seamlessly.',
    accent: '#9fb3ff',
    accentSoft: 'rgba(159, 179, 255, 0.24)',
    members: [
      {
        name: 'RITESH KUMAR MONDAL',
        role: 'LEAD DECORATION',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQEogHG1_HU_MA/feedshare-shrink_2048_1536/B56Z1mrf6XKMAg-/0/1775544172466?e=1776902400&v=beta&t=T7OZ9D_qkE-dl8RxJzhWBhhjklni0X34tztzLJreDYY'
      },
      {
        name: 'ARDINA BANNERJEE',
        role: 'LEAD DECO',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQHS9L5C4oqTpw/feedshare-shrink_2048_1536/B56Z1mtK.DHMAg-/0/1775544610997?e=1776902400&v=beta&t=seCB7XjE5_CXW2rhcNduu-wAR7D5-vDOYotSptwrTyw'
      },
      {
        name: 'AYAN PAL',
        role: 'LEAD LOGISTICS',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQFaG0Y6Kg9U9g/feedshare-shrink_1280/B56Z1nAKDYKYAQ-/0/1775549587926?e=1776902400&v=beta&t=kTui3-mcpkDu3gqwYYFL81rRWOrrUrpqdwkOMfnPF14'
      },
        {
        name: 'SOUMYADEEP PURKAYASTHA',
        role: 'LEAD GROUND COORDINATION',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQGZqcd91SCAww/feedshare-shrink_800/B56Z1mvTgOK0Ag-/0/1775545170170?e=1776902400&v=beta&t=uMcC0pBD4V9E3FJ-lowlR5HBCawr4dFJSmAtnhiZiSE'
      },
      {
        name: 'HIMEL BISWAS',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQFvES4_BzEx-w/feedshare-shrink_2048_1536/B56Z1mtbGuI8Ag-/0/1775544677070?e=1776902400&v=beta&t=pL4FvAusKMAPD60LKXOY1clFkJUFmKv7QdMPL7rK5qE'
      },
      {
        name: 'MASUD MALLIK',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQG1zY3xgJYgRQ/feedshare-shrink_1280/B56Z1mtf4.JgAQ-/0/1775544696598?e=1776902400&v=beta&t=XXGiP2bOhkFDejO9QzGiWNina80ynLa9YpoQwln5ERk'
      },
      {
        name: 'SAYANTIKA SAHA',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQF6QfFCF1NC0A/feedshare-shrink_1280/B56Z1mt7hhK0AM-/0/1775544809816?e=1776902400&v=beta&t=HODjhEbNDmBrMZ1LHPgRnrKaFItoc60my9nzf5nVFwI'
      },
      {
        name: 'SAYANTIKA DEY',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQGQr0hU3lQx6w/feedshare-shrink_800/B56Z1mvfh3GwAc-/0/1775545219436?e=1776902400&v=beta&t=ISmGSzjenycLW9jRDleU3Z4pTaA-0tOuRmcuZN4nnww'
      },
      {
        name: 'MOUPIYA AICH',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQHqaf_Wz1Rycw/feedshare-shrink_480/B56Z1mtqNpJgAo-/0/1775544738890?e=1776902400&v=beta&t=vRbXvyU76547Fb9VwV-SiN9S19yMizCLTqPISAAGfzs'
      },
      {
        name: 'SNEHASISH SAHA',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQF7xnd-1XgTyQ/feedshare-shrink_2048_1536/B56Z1mtktyHoAo-/0/1775544716369?e=1776902400&v=beta&t=XFqposP-wCtBFlRHSiEpT4a9fD94ftd_k4-slXZ7f4A'
      },
      {
        name: 'DEVJIT MANNA',
        role: 'MEMBER',
        year: '3RD YEAR',
        image: 'https://media.licdn.com/dms/image/v2/D5622AQH89G0kxteISg/feedshare-shrink_480/B56Z1mtvF2I8A0-/0/1775544758843?e=1776902400&v=beta&t=r29UBnh_xgqiEf-dMAnrRw2XXtPOw3TBzlTNn-LyXjw'
      },
    

    ]
  },
  {
    title: 'EVENT HOSTS',
    subtitle: 'Guiding the flow and elevating the energy on stage.',
    accent: '#ffffff',
    accentSoft: 'rgba(255, 255, 255, 0.2)',
    members: [
      {
        name: 'Coming Soon',
        year: '3RD YEAR',
        image:
          ''
      }
    ]
  }
];

const OrganizersPage = () => {
  return (
    <>
      <EvilEye />
      <Nav />

      <main className="organizers-page">
        <div className="organizers-content">
          <h1 className="organizers-page-heading"><span>THE</span>ORGANIZERS</h1>

          {sectionData.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="organizers-section"
              style={{
                '--section-accent': section.accent,
                '--section-accent-soft': section.accentSoft,
                '--reveal-delay': `${0.1 * sectionIndex}s`
              }}
            >
              <h2 className="organizers-section-heading">{section.title}</h2>
              <p className="organizers-section-subtitle">{section.subtitle}</p>

              <div className="organizers-cards-grid">
                {section.members.map((member, memberIndex) => (
                  <div
                    key={`${section.title}-${member.name}-${memberIndex}`}
                    className="organizers-card-entry"
                    style={{ '--card-delay': `${0.16 + memberIndex * 0.05}s` }}
                  >
                    <OrganizerCard member={member} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default OrganizersPage;
