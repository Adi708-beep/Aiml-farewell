import './OrganizerCard.css';

const OrganizerCard = ({ member }) => {
  const roleText = member.role || 'TEAM MEMBER';
  const isSpecialLead = /\b(lead|core)\b/i.test(roleText);

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <article className="organizer-card">
      <div className="organizer-image-wrap">
        {isSpecialLead && (
          <div className="organizer-special-badge" aria-label="Special lead badge">
            <span>LEAD</span>
          </div>
        )}

        {member.image ? (
          <img className="organizer-image" src={member.image} alt={member.name} loading="lazy" />
        ) : (
          <div className="organizer-image-placeholder" aria-label={`${member.name} placeholder image`}>
            {initials}
          </div>
        )}
        <div className="organizer-image-overlay" aria-hidden="true" />
        <div className="organizer-image-blend" aria-hidden="true" />
      </div>

      <div className="organizer-meta">
        <p className="organizer-role">{roleText}</p>
        <h3 className="organizer-name">{member.name}</h3>
        <p className="organizer-year">{member.year}</p>
      </div>
    </article>
  );
};

export default OrganizerCard;
