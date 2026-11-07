'use client';

import { useEffect } from 'react';
import SankeyChart from './SankeyChart';

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="container">
      <h1>Finanse Polski 2026</h1>
      <p className="subtitle">
        Jeden punkt zbieżny — wszystkie wpływy i wszystkie wydatki. Dane z ustawy budżetowej, planów FUS i NFZ, MF oraz GUS.
      </p>

      <SankeyChart />

      <section className="fade-in">
        <h2>Co wchodzi w skład finansów publicznych</h2>
        <p>
          Budżet państwa to tylko część obrazu. Obok niego działają Fundusz Ubezpieczeń Społecznych, Narodowy Fundusz Zdrowia, budżet środków europejskich i budżety jednostek samorządu terytorialnego.
        </p>
        <table>
          <thead>
            <tr><th>Element</th><th>Kwota</th><th>Co to jest</th></tr>
          </thead>
          <tbody>
            <tr><td>Budżet państwa</td><td>~655,4 mld dochodów / ~918,9 mld wydatków</td><td>Ustawa budżetowa. Deficyt ~263,5 mld zł finansowany pożyczkami.</td></tr>
            <tr><td>FUS</td><td>~509 mld (składki ~403,5 + dotacja ~90,8)</td><td>Emerytury i renty. Wydatki głównie ~444 mld zł na świadczenia.</td></tr>
            <tr><td>NFZ</td><td>~227 mld (składki ~184 + dotacja ~33–37)</td><td>Leczenie. Wydatki ~200 mld zł na świadczenia zdrowotne.</td></tr>
            <tr><td>Budżet środków europejskich</td><td>~138 mld dochodów / ~174 mld wydatków</td><td>Fundusze UE, WPR, część KPO. W budżecie państwa widać tylko ~3,6 mld zł.</td></tr>
            <tr><td>Budżety JST</td><td>~250–300 mld (szacunek)</td><td>Subwencje ~52,7 mld + udział w PIT + dochody własne (podatki lokalne, opłaty).</td></tr>
          </tbody>
        </table>
      </section>

      <section className="fade-in">
        <h2>Podatki — kto płaci</h2>
        <p>VAT jest podatkiem konsumpcyjnym — płacą go wszyscy przy zakupach. CIT jest silnie skoncentrowany. PIT w budżecie jest niski, bo duża część trafia do samorządów.</p>
        <table>
          <thead>
            <tr><th>Podatek / składka</th><th>Kwota</th><th>Kto płaci</th></tr>
          </thead>
          <tbody>
            <tr><td>VAT</td><td>341,5 mld zł</td><td>Konsumenci (formalnie rozliczają firmy). Największy wpływ do budżetu.</td></tr>
            <tr><td>CIT</td><td>80,4 mld zł</td><td>~1% największych podatników odpowiada za ~60% wpływów. Dominują banki (PKO BP, Pekao, Santander/Erste, ING) i energetyka (Orlen, KGHM). Efektywna stawka największych grup z GPW to ok. 33%.</td></tr>
            <tr><td>PIT</td><td>32,0 mld zł (do budżetu)</td><td>Pracownicy, zleceniobiorcy, przedsiębiorcy. Część idzie bezpośrednio do JST.</td></tr>
            <tr><td>Akcyza — paliwa</td><td>42,2 mld zł</td><td>Kierowcy i firmy transportowe.</td></tr>
            <tr><td>Akcyza — tytoń</td><td>34,7 mld zł</td><td>Palacze.</td></tr>
            <tr><td>Akcyza — alkohol</td><td>11,7 mld zł</td><td>Konsumenci alkoholu.</td></tr>
            <tr><td>Akcyza — piwo</td><td>4,1 mld zł</td><td>Konsumenci piwa.</td></tr>
            <tr><td>Akcyza — samochody</td><td>4,7 mld zł</td><td>Kupujący nowe auta.</td></tr>
            <tr><td>Akcyza — pozostałe</td><td>5,9 mld zł</td><td>Energia elektryczna, wyroby węglowe, gaz i inne.</td></tr>
            <tr><td>Składki emerytalne</td><td>403,5 mld zł</td><td>Pracownicy i pracodawcy. Trafiają do FUS.</td></tr>
            <tr><td>Składki zdrowotne</td><td>184 mld zł</td><td>Ubezpieczeni. Trafiają do NFZ.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="fade-in">
        <h2>Czego nie ma na wykresie</h2>
        <table>
          <thead>
            <tr><th>Element</th><th>Skala</th><th>Uwagi</th></tr>
          </thead>
          <tbody>
            <tr><td>Dług ukryty emerytalny</td><td>Szacunki historyczne: kilka bilionów zł</td><td>Zobowiązania ZUS/KRUS wobec przyszłych emerytów. To nie obligacje — przyszłe świadczenia zależne od składek i demografii.</td></tr>
            <tr><td>Pełne zobowiązania FWSZ</td><td>Setki mld zł do 2035 r. (NIK)</td><td>Fundusz Wsparcia Sił Zbrojnych finansuje zakupy obronne kredytami BGK. Koszty obsługi rosną.</td></tr>
            <tr><td>Gwarancje i poręczenia</td><td>Zmienna</td><td>Zobowiązania warunkowe Skarbu Państwa.</td></tr>
            <tr><td>OFE</td><td>~200+ mld zł aktywów</td><td>Pieniądze członków, nie budżetu.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="fade-in">
        <h2>Co kryje się pod „inne” i „pozostałe”</h2>
        <table>
          <thead>
            <tr><th>Kategoria</th><th>Kwota</th><th>Skład</th></tr>
          </thead>
          <tbody>
            <tr><td>Inne rozliczenia</td><td>~70,2 mld zł</td><td>Rozliczenia międzyfunduszowe, subwencje i dopłaty, które nie mieszczą się w głównych działach. Obejmują rozliczenia z FUS, NFZ i innymi funduszami poza głównymi pozycjami.</td></tr>
            <tr><td>Pozostałe działy</td><td>~20,9 mld zł</td><td>Mniejsze działy budżetowe: turystyka, sport, środowisko, gospodarka wodna, łączność, informatyzacja i inne poniżej głównych pozycji.</td></tr>
            <tr><td>Akcyza — pozostałe</td><td>~5,9 mld zł</td><td>Akcyza od energii elektrycznej, wyrobów węglowych, gazu i innych pozycji poza paliwami, tytoniem, alkoholem i samochodami.</td></tr>
            <tr><td>Inne świadczenia FUS</td><td>~65 mld zł</td><td>Renty, zasiłki i świadczenia poza emeryturami.</td></tr>
            <tr><td>Inne NFZ</td><td>~27 mld zł</td><td>Profilaktyka, refundacja leków, koszty administracyjne i inne poza bezpośrednim leczeniem.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="fade-in">
        <h2>Dług publiczny</h2>
        <p>
          Są dwie główne miary. Konstytucja odnosi się do państwowego długu publicznego (PDP) — węższej definicji krajowej. Metodologia unijna (EDP) jest szersza i obejmuje fundusze BGK.
        </p>
        <table>
          <thead>
            <tr><th>Miara</th><th>Kwota (koniec II kw. 2026)</th><th>% PKB</th><th>Co obejmuje</th></tr>
          </thead>
          <tbody>
            <tr><td>PDP (krajowa)</td><td>~2 148 mld zł</td><td>~50–53%</td><td>Sektor finansów publicznych po konsolidacji. Do niej odnosi się art. 216 ust. 5 Konstytucji.</td></tr>
            <tr><td>EDP (unijna)</td><td>~2 598 mld zł</td><td>~61–67%</td><td>Szersza — obejmuje fundusze BGK (FPC, FWSZ, KFD, inne).</td></tr>
          </tbody>
        </table>
        <p>
          Różnica ~450 mld zł to głównie fundusze BGK. Deficyt budżetowy (~263,5 mld zł w 2026) jest finansowany emisją obligacji skarbowych (krajowych i zagranicznych), bonów i kredytów. Nabywcy to banki krajowe, inwestorzy zagraniczni, fundusze i osoby fizyczne. Koszty obsługi długu w budżecie to ~90,4 mld zł rocznie, z prognozą wzrostu do ~107 mld zł w 2027.
        </p>
        <h3>Składniki różnicy PDP ↔ EDP</h3>
        <table>
          <thead>
            <tr><th>Fundusz</th><th>Kwota</th><th>Przeznaczenie</th></tr>
          </thead>
          <tbody>
            <tr><td>Fundusz Przeciwdziałania COVID-19</td><td>~221 mld zł</td><td>Wydatki pandemiczne i następcze.</td></tr>
            <tr><td>Fundusz Wsparcia Sił Zbrojnych</td><td>~120 mld zł</td><td>Zakupy obronne. Finansowany kredytami BGK.</td></tr>
            <tr><td>Krajowy Fundusz Drogowy</td><td>~71 mld zł</td><td>Inwestycje drogowe.</td></tr>
            <tr><td>Inne BGK</td><td>~38 mld zł</td><td>Pozostałe fundusze celowe.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="fade-in">
        <h2>Limit konstytucyjny i prognozy</h2>
        <p>
          Art. 216 ust. 5 Konstytucji: „Nie wolno zaciągać pożyczek lub udzielać gwarancji i poręczeń finansowych, w następstwie których państwowy dług publiczny przekroczy 3/5 wartości rocznego produktu krajowego brutto.” Limit dotyczy PDP, nie EDP. EDP już przekroczył 60% PKB — to nie narusza konstytucji.
        </p>
        <p>
          Ustawa o finansach publicznych przewiduje próg ostrożnościowy 55% PKB. Po jego przekroczeniu uruchamiane są ograniczenia wzrostu wydatków, wynagrodzeń i deficytu w kolejnym budżecie.
        </p>
        <table>
          <thead>
            <tr><th>Rok</th><th>PDP / PKB</th><th>EDP / PKB</th></tr>
          </thead>
          <tbody>
            <tr><td>2026</td><td>55,3%</td><td>67,6%</td></tr>
            <tr><td>2027</td><td>55,9%</td><td>69,3%</td></tr>
            <tr><td>2028</td><td>58,6%</td><td>73,1%</td></tr>
            <tr><td>2029</td><td>59,2%</td><td>75,7%</td></tr>
            <tr><td>2030</td><td>58,3%</td><td>76,6%</td></tr>
          </tbody>
        </table>
        <p>
          Według Strategii zarządzania długiem MF (2027–2030) próg 55% PDP ma być przekroczony w 2028 r., co uruchomi procedury ostrożnościowe w 2030 r. Konstytucyjny 60% PDP ma pozostać nieprzekroczony w horyzoncie strategii. EDP już jest powyżej 60% i ma rosnąć do ~76% PKB w 2030.
        </p>
        <p className="note">
          Źródła: ustawa budżetowa na rok 2026 (Dz.U. 2026 poz. 62), plany FUS i NFZ, biuletyny kwartalne długu publicznego MF, Strategia zarządzania długiem sektora finansów publicznych na lata 2027–2030 (MF, wrzesień 2026), GUS. Dane orientacyjne, zaokrąglone.
        </p>
      </section>
    </div>
  );
}
