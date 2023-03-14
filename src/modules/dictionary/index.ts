export const DISTRICTS = {
    medeu: 'medeu',
    bostandyk: 'bostandyk',
    alatau: 'alatau',
    turksib: 'turksib',
    nauryzbay: 'nauryzbay',
    zhetysu: 'zhetysu',
    almaly: 'almaly',
    auezov: 'auezov',
};

type TDISTRICTSMAP = { [key in keyof typeof DISTRICTS]: { id: number; name: string } };

export const DISTRICTS_MAP: TDISTRICTSMAP = {
    medeu: { id: 5, name: 'Медеу' },
    bostandyk: { id: 8, name: 'Бостандык' },
    alatau: { id: 4, name: 'Алатау' },
    turksib: { id: 2, name: 'Турксиб' },
    nauryzbay: { id: 9, name: 'Наурызбай' },
    zhetysu: { id: 3, name: 'Жетысу' },
    almaly: { id: 6, name: 'Алмалы' },
    auezov: { id: 7, name: 'Ауэзов' },
};
