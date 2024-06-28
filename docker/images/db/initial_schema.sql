-- Criação da tabela senators
CREATE TABLE public.senators (
    id SERIAL PRIMARY KEY,
    caucus VARCHAR(255),
    current BOOLEAN,
    description TEXT,
    district VARCHAR(255),
    enddate DATE,
    leadership_title VARCHAR(255),
    party VARCHAR(50),
    bioguideid VARCHAR(50),
    birthday DATE,
    cspanid INTEGER,
    firstname VARCHAR(255),
    gender VARCHAR(50),
    lastname VARCHAR(255),
    link TEXT,
    middlename VARCHAR(255),
    name VARCHAR(255),
    namemod VARCHAR(255),
    nickname VARCHAR(255),
    osid VARCHAR(50),
    sortname VARCHAR(255),
    twitterid VARCHAR(50),
    youtubeid VARCHAR(50),
    phone VARCHAR(50),
    role_type VARCHAR(50),
    senator_class VARCHAR(50),
    senator_rank VARCHAR(50),
    startdate DATE,
    state VARCHAR(50),
    title VARCHAR(50),
    title_long VARCHAR(50),
    website TEXT,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela congress_numbers
CREATE TABLE public.congress_numbers (
    id SERIAL PRIMARY KEY,
    senator_id INTEGER REFERENCES senators(id),
    congress_number INTEGER,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela extra
CREATE TABLE public.extra (
    id SERIAL PRIMARY KEY,
    senator_id INTEGER REFERENCES senators(id),
    address TEXT,
    contact_form TEXT,
    office TEXT,
    rss_url TEXT,
    created_by VARCHAR(255) NOT NULL DEFAULT 'system',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados na tabela senators
INSERT INTO public.senators (
    caucus, current, description, district, enddate, leadership_title, party,
    bioguideid, birthday, cspanid, firstname, gender, lastname, link, middlename, 
    name, namemod, nickname, osid, sortname, twitterid, youtubeid, phone, role_type,
    senator_class, senator_rank, startdate, state, title, title_long, website,
    created_by, created_at, updated_at
) VALUES (
    NULL, TRUE, 'Junior Senator for Washington', NULL, '2025-01-03', NULL, 'Democrat',
    'C000127', '1958-10-13', 26137, 'Maria', 'female', 'Cantwell', 'https://www.govtrack.us/congress/members/maria_cantwell/300018',
    '', 'Sen. Maria Cantwell [D-WA]', '', '', 'N00007836', 'Cantwell, Maria (Sen.) [D-WA]',
    'SenatorCantwell', 'SenatorCantwell', '202-224-3441', 'senator', 'class1', 'junior',
    '2019-01-03', 'WA', 'Sen.', 'Senator', 'https://www.cantwell.senate.gov',
    'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) RETURNING id;

-- Supondo que o ID retornado seja 1 para o exemplo
-- Inserir dados na tabela congress_numbers
INSERT INTO public.congress_numbers (senator_id, congress_number, created_by, created_at, updated_at) VALUES (1, 116, 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.congress_numbers (senator_id, congress_number, created_by, created_at, updated_at) VALUES (1, 117, 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.congress_numbers (senator_id, congress_number, created_by, created_at, updated_at) VALUES (1, 118, 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserir dados na tabela extra
INSERT INTO public.extra (senator_id, address, contact_form, office, rss_url, created_by, created_at, updated_at) VALUES (
    1, '511 Hart Senate Office Building Washington DC 20510', 'https://www.cantwell.senate.gov/public/index.cfm/email-maria',
    '511 Hart Senate Office Building', 'http://www.cantwell.senate.gov/public/index.cfm/rss/feed',
    'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);
