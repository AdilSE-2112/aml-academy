import React, { useState, useEffect } from 'react';

import DefaultHeader from '../../components/defaultHeader/DefaultHeader';
import Footer from '../../components/footer/Footer';

import './InfoPage.scss'
import Quote from '../../components/UI/quote/Quote';
import NumeratedList from '../../components/UI/NumeratedList';

import img1 from './../../assets/images/image 21.png'

import webIcon from './../../assets/icons/web-icon.png';
import folderIcon from './../../assets/icons/folder-icon.png';
import pinIcon from './../../assets/icons/pin-icon.png';

function InfoPage() {
    const [currActiveElement, setCurrActiveElement] = useState(null);

    const handleNavClick = (event) => {
        if (currActiveElement != null) {
            currActiveElement.classList.remove('active');
        }

        event.target.classList.add('active');
        setCurrActiveElement(event.target)
    }

    return ( 
        <div className="course-info-page">
            <div>
                <div className="container">
                    <DefaultHeader />
                </div>
            </div>

            <main className='page-content container'>
                <div>
                    <a href='#p-1' onClick={handleNavClick}>Нормативно-правовые акты</a>
                    <a href='#p-2' onClick={handleNavClick}>Требования к СФМ по обучению и тестированию</a>
                    <a href='#p-3' onClick={handleNavClick}>Обучение и дополнительное обучение</a>
                    <a href='#p-4' onClick={handleNavClick}>Информация по тестированию</a>
                    <a href='#p-5' onClick={handleNavClick}>Филиалы Центра тестирования</a>
                </div>

                <div>
                    <div className='article'>
                        <h1 id='#p-1'>Нормативно-правовые акты</h1>
                        <h3>Закон Республики Казахстан «О противодействии легализации (отмыванию) доходов, добытых преступным путем, и финансированию терроризма</h3>

                        

                        <div style={{marginBottom: '15px'}}>
                            <Quote text={'В соответствии с п.2 ст.11 Закона, Субъекты финансового мониторинга в целях предотвращения легализации (отмывания) доходов, полученных преступным путем, финансирования терроризма и финансирования распространения оружия массового уничтожения разрабатывают правила внутреннего контроля и программы его осуществления, а также несут ответственность за соблюдение правил и реализацию программ.'}/>
                        </div>

                        

                        <div style={{marginBottom: '35px'}}>
                            <NumeratedList 
                                title={'Согласно п.3 ст.11 Закона, правила внутреннего контроля должны включать в себя'}
                                list={[
                                    'программу организации внутреннего контроля',
                                    'программу управления риском (низкий, высокий уровни риска) ОД/ФТ',
                                    'программу идентификации клиентов',
                                    'программу мониторинга и изучения операций клиентов',
                                    'программу подготовки и обучения'
                                ]}
                            />
                        </div>

                        <h2>Требования к правилам внутреннего контроля</h2>

                        <div className='list-1'>
                            <p>
                                Требования к правилам внутреннего контроля в целях противодействия легализации (отмыванию) доходов, полученных преступным путем, финансированию терроризма и финансированию распространения оружия массового уничтожения по видам субъектов финансового мониторинга устанавливаются:
                            </p>
                            <ul>
                                <li>
                                    уполномоченным органом по регулированию, контролю и надзору финансового рынка и финансовых организаций по согласованию с уполномоченным органом для субъектов финансового мониторинга, предусмотренных подпунктами 1) (за исключением юридических лиц, осуществляющих деятельность исключительно через обменные пункты на основании лицензии Национального Банка Республики Казахстан на обменные операции с наличной иностранной валютой), 2) (за исключением товарных бирж), 3), 4), 5) и 11) пункта 1 статьи 3 настоящего Закона;
                                </li>
                                <li>
                                    Национальным Банком Республики Казахстан по согласованию с уполномоченным органом для субъектов финансового мониторинга, предусмотренных подпунктами 1) (в части юридических лиц, осуществляющих деятельность исключительно через обменные пункты на основании лицензии Национального Банка Республики Казахстан на обменные операции с наличной иностранной валютой) и 12) пункта 1 статьи 3 настоящего Закона;
                                </li>
                                <li>
                                    уполномоченным органом и соответствующим государственным органом для субъектов финансового мониторинга, предусмотренных подпунктами 6), 9), 10) и 20) пункта 1 статьи 3 настоящего Закона, а также товарных бирж;
                                </li>
                                <li>
                                    уполномоченным органом для субъектов финансового мониторинга, предусмотренных подпунктами 7), 8), 13), 15), 16) и 18) пункта 1 статьи 3 настоящего Закона;
                                </li>
                                <li>
                                    Комитетом МФЦА по регулированию финансовых услуг по согласованию с уполномоченным органом для субъектов финансового мониторинга, предусмотренных в подпункте 19) пункта 1 статьи 3 настоящего Закона.
                                </li>
                            </ul>
                        </div>

                        <h2>Приказ Председателя Агентства Республики Казахстан по финансовому мониторингу от 9 августа 2021 года № 6</h2>
                        <p>
                            Программа подготовки и обучения Субъектов в сфере ПОД/ФТ/ФРОМУ разрабатывается в соответствии с Требованиями к субъектам финансового мониторинга по подготовке и обучению в сфере ПОД/ФТ/ФРОМУ, утверждаемыми уполномоченным органом (Агентством по финансовому мониторингу) по согласованию с государственными органами-регуляторами.
                        </p>
                        <p>
                            Вышеуказанные Требования утверждены Приказом Председателя Агентства Республики Казахстан по финансовому мониторингу от 9 августа 2021 года № 6.
                        </p>
                    </div>
                    <div className='article'>
                        <h1 id='p-2'>Требования к СФМ по обучению и тестированию</h1>
                        <div className='block-witd-image-right'>
                            <div>
                                <p>
                                    Субъекты финансового мониторинга проходят обучение в целях ПОД/ФТ в соответствии с программой обучения, разработанной согласно пунктам 4 и 5 приказа Председателя Агентства Республики Казахстан по финансовому мониторингу от 9 августа 2021 года № 6.
                                </p>
                                <p>
                                    Целью подготовки и обучения является получение субъектами знаний в сфере ПОД/ФТ в соответствии с Требованиями, необходимых им для соблюдения законодательства Республики Казахстан о ПОД/ФТ.
                                </p>
                            </div>
                            <img src={img1} alt="image" />
                        </div>
                        <p>
                            В целях подтверждения изучения субъектами материала, изученного в процессе обучения субъекты проходят тестирование с периодичностью не реже 1 (одного) раза в 3 (три) года с даты прохождения тестирования на базе "Национального центра по управлению персоналом государственной службы" и его территориальных подразделений.
                        </p>
                        <p>
                            Срок действия результатов тестирования составляет 3 (три) года с момента прохождения аттестации с положительным результатом.
                        </p>
                        <div style={{marginBottom: '15px'}}>
                            <Quote text={'Все субъекты с момента введения в действие Требований проходят тестирование в течение последующих 2 (двух) лет, т.е. до 27 августа 2023 года. После прохождения данного срока отсутствие результатов тестирования у субъектов финансового мониторинга, приступивших к осуществлению деятельности, при выходе уполномоченного органа на проверку будет считаться нарушением.'}/>
                        </div>
                    </div>
                    <div className="article">
                        <h1 id='p-3'>Обучение и дополнительное обучение</h1>
                        <p>
                            Субъекты разрабатывают программу подготовки и обучения в сфере ПОД/ФТ с учетом требований законодательства Республики Казахстан о ПОД/ФТ, а также особенностей деятельности субъектов и их клиентов.
                        </p>
                        <p>
                            Руководитель субъекта утверждает перечень ответственных лиц, которые проходят обучение в целях ПОД/ФТ, до начала осуществления ими функций, связанных с соблюдением законодательства Республики Казахстан о ПОД/ФТ.
                        </p>

                        <div className='list-2'>
                            <p>
                                В соответствии с п. 6 вышеуказанного приказа, дополнительное обучение проводится субъектом, ответственным за соблюдение правил внутреннего контроля (за исключением субъектов, осуществляющих свою деятельность единолично), утвержденных в соответствии со статьей 11 Закона о ПОД/ФТ, в следующих случаях:
                            </p>
                            <div>
                                <p>
                                    при изменении действующих и вступлении в силу новых нормативных правовых актов Республики Казахстан в области ПОД/ФТ;
                                </p>
                                <p>
                                    при утверждении субъектом новых или изменении действующих правил внутреннего контроля в целях ПОД/ФТ и программ их осуществления.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="article">
                        <h1 id='p-4'>Информация по тестированию</h1>
                        <p>Тестирование субъектов финансового мониторинга включает в себя вопросы по следующим НПА:</p>
                        <div className="grid-list">
                            {
                                [
                                    'Правила внутреннего контроля в целях ПОД/ФТ',
                                    'Закон о ПОД/ФТ',
                                    'Рекомендации ФАТФ',
                                    'Кодекс об административных правонарушениях',
                                    'Руководство пользователя',
                                    'Взаимная оценка',
                                    'Типологии, схемы и способы ОД/ФТ',
                                    'Профильный вопрос СФМ (при наличии)',
                                    'Уголовный кодекс РК',
                                    'Требования к СФМ по подготовке и обучению в сфере ПОД/ФТ',
                                    'Критерии оценки степени риска и проверочный лист за соблюдением законодательства РК о ПОД/ФТ',
                                    'Правила представления СФМ сведений и информации об операциях, подлежащих финансовому мониторингу, и признаки определения подозрительной операции'
                                ].map(value => (
                                    <div>
                                        {value}
                                    </div>

                                ))
                            }
                        </div>

                        <p>
                            Тестовые вопросы разрабатываются уполномоченным органом по финансовому мониторингу. <br/>
                            Распределение тестовых вопросов на основании заявки субъекта: <br/>
                            · 80% - общие вопросы <br/>
                            · 20% - профильные вопросы <br/>
                            Продолжнительность тестирования – 90 минут <br/>
                            Количество вопросов по НПА в сфере ПОД/ФТ – 100 (пороговый балл 70) <br/>
                            Количество вопросов по оценке личных качеств – 24 (порогового балла нет) <br/>
                        </p>
                        <p>
                            Заявку на прохождение тестирования можно подать в Личном кабинете на портале Агентства по финансовому мониторингу, в разделе «Обучение», подраздел «Тестирование».
                        </p>

                        <div className="list-3">
                            <div>
                                <p className='num'>1</p>
                                <img src={webIcon} alt="" className="icon" />
                                <p className="title">websfm.kz</p>
                                <p className="desc">Официальный портал Агентсва</p>
                            </div>
                            <div>
                                <p className='num'>2</p>
                                <img src={folderIcon} alt="" className="icon" />
                                <p className="title">Раздел “Обучение”</p>
                                <p className="desc">Официальный портал Агентсва</p>
                            </div>
                            <div>
                                <p className='num'>3</p>
                                <img src={pinIcon} alt="" className="icon" />
                                <p className="title">Заявка</p>
                                <p className="desc">для прохождения тестирования на знание законодательства и оценки личных качеств</p>
                            </div>
                        </div>
                    </div>
                    <div className="article">
                        <h1 id='p-5'>Филиалы Центра тестирования</h1>
                        <p>
                            Субъекты проходят тестирование на базе АО "Национальный центр по управлению персоналом государственной службы" и его территориальных подразделений. При заполнении заявки на тестирование в Личном кабинете Портала АФМ субъект финансового мониторинга самостоятельно указывает филиал Центра тестирования, дату и время прохождения тестирования.
                        </p>
                        <p>
                            Адреса филиалов Центра тестирования:
                        </p>
                        <table>
                            <tr>
                                <td>№</td>
                                <td>Регион</td>
                                <td>Адреса</td>
                            </tr>
                            {
                                [
                                    {region: 'Актау', address: '130000, город Актау, 14 микрорайон, 1 здание, 2-этаж'},
                                    {region: 'Актобе', address: '030020, город Актобе, улица Тургенева 86, 1-этаж (здание партии «Аманат»)'},
                                    {region: 'Алматы', address: '050008, город Алматы, улица Толе би 155, угол улицы Байзакова, 1-этаж, кабинеты №1 и №2'},
                                    {region: 'Астана', address: '010000, город Астана, улица Абая 33а'},
                                    {region: 'Атырау', address: '060005, город Атырау, улица Айтеке би 79А (здание партии «Аманат»)'},
                                    {region: 'Караганда', address: '100012, город Караганда, улица Архитектурная 13, кабинет 213, здание Акимата Октябрьского района города Караганды'},
                                    {region: 'Кокшетау', address: '020000, город Кокшетау, улица Абая 87, 1-этаж, здание филиала Академии государственного управления при Президенте Республики Казахстан'},
                                    {region: 'Костанай', address: '110000, город Костанай, улица Аль-Фараби 43, 1-этаж'},
                                    {region: 'Кызылорда', address: '120003, город Кызылорда, улица Султан Бейбарыс 1, 1-этаж, кабинет 103, здание Акимата Кызылординской области'},
                                    {region: 'Павлодар', address: '140000, город Павлодар, улица Каирбаева 32/3, 1 этаж, кабинет 116'},
                                    {region: 'Петропавловск', address: '150000, город Петропавловск, улица Конституции Казахстана 38, 1 этаж, кабинет 5, здание Северо-Казахстанского областного маслихата'},
                                    {region: 'Семей', address: '150000, город Семей, улица Достоевского 110, 2 этаж, кабинет 225'},
                                    {region: 'Талдыкорган', address: '071410, город Талдыкорган, парк Жастар, здание Рухани жангыру, цокольный этаж'},
                                    {region: 'Тараз', address: '080000, город Тараз, улица Желтоксан 78, 7-этаж, кабинет 702'},
                                    {region: 'Туркестан', address: '161200, город Туркестан, 160 квартал, участок 254 (Дом областных территориальных министерств, В-блок, 2 этаж, кабинет 2123)'},
                                    {region: 'Уральск', address: '090000, город Уральск, проспект Назарбаева (Достык-Дружбы) 201, 2-этаж, кабинет 202, здание Западно-Казахстанского областного маслихата'},
                                    {region: 'Усть-Каменогорск', address: '070004, город Усть-Каменогорск, ул. Казахстан 63, 1-этаж, зал №2 (здание регионального центра тестирования Ustudy)'},
                                    {region: 'Шымкент', address: '160018, город Шымкент, проспект Тәуке хана, 3, здание филиала Академии государственного управления при Президенте Республики Казахстан'},
                                    {region: 'Аралык', address: '110301, город Аркалык, проспект Абая 29, 3 этаж, кабинет 310, здание акимата города Аркалык'},
                                    {region: 'Балхаш', address: '100302, город Балхаш, улица Бокейханова, 20, 2 этаж'},
                                    {region: 'Жезказган', address: '100602, город Жезказган, площадь Алаша 1, 8 этаж, кабинет № 813, здание акимата города Жезказган'},
                                ].map((obj, index) => (
                                    
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{obj.region}</td>
                                        <td>{obj.address}</td>
                                    </tr>
                                    
                                ))
                            }
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default InfoPage;