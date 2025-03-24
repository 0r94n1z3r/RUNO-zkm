export default defineStore("useStatic", ()=>{

//order
    const {data: fetchedOrderStatuses} = useAPI(`/lk/orders/order_statuses/`);

    const orderStatuses = computed(()=>fetchedOrderStatuses.value.map(
        e => {
            //color
                const colors = 
                    [1].includes(e.id)?
                        {
                            color: '#999999', 
                            'alt-color': 'var(--white)'
                        }:
                    [2,3,4].includes(e.id)?
                        {
                            color: '#F4A53D', 
                            'alt-color': '#FCE8CE'
                        }:
                    [6].includes(e.id)?
                        {
                            color: '#3C90CB', 
                            'alt-color': '#CEE3F2'
                        }:
                    [5,7,8].includes(e.id)?
                        {
                            color: 'var(--green-100)', 
                            'alt-color': 'var(--green-40)'
                        }:
                        {
                            color: 'var(--red-100)', 
                            'alt-color': 'var(--red-40)'
                        }

            return {...e, ...colors}
        }
    ) || [])

    const getOrderStatus = (id)=>orderStatuses.value.find(e => e.id == id)

// payments
    const {data: fetchedPayments} = useAPI(`/lk/orders/order_payment_types`);

    const payments = computed(()=>fetchedPayments.value || [])

    const getPayment = (id)=>payments.value.find(e => e.id == id);

//contacts
    const contacts = {
        tel: '+7 (499) 769-21-30',
        address: '«Тракт» МКАД 32 км, Нагорная ул., с11, пос. Битца',
        time: 'Пн.-Пт.: с 9:30 до 17:00',
        email: 'info@zkmgidro.ru'
    }
    
//----------------------------------------------------------------
    return {
        orderStatuses,
        getOrderStatus,

        payments,
        getPayment,

        contacts,
    }
})