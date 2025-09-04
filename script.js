document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('layout-container');
    const card = document.getElementById('motor-card');
    const closeButton = document.getElementById('close-card');
    const motorDataMap = new Map();

    fetch('motors.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
            return response.json();
        })
        .then(data => {
            data.forEach(motor => motorDataMap.set(motor.motor_id, motor));
            console.log('Motor data loaded successfully!');
        })
        .catch(error => {
            console.error('Error loading motor data:', error);
            alert('Failed to load motor data. Please check the `motors.json` file.');
        });

    svgContainer.addEventListener('click', (event) => {
        const targetMotor = event.target.closest('[id]');
        if (targetMotor && motorDataMap.has(targetMotor.id)) {
            const data = motorDataMap.get(targetMotor.id);
            populateCard(data);
            card.classList.remove('hidden');
        }
    });

    function populateCard(data) {
        const setText = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value || 'N/A';
            }
        };

        // Main Info
        setText('card-motor-id', data.motor_id);
        setText('card-equipment-description', data.Equipment_Description);

        // Location & Control
        setText('card-mcc', data.MCC);
        setText('card-mcc-location', data.MCC_Location);
        setText('card-system-cabinet', data.System_Cabinet);
        setText('card-segment-no', data.Segment_No);
        setText('card-profibus-address', data.Profibus_Address);
        setText('card-swr-no', data.SWR_No);

        // Electrical Specs
        setText('card-power-kw', data.Power_KW);
        setText('card-hp-kw', data.HP_KW);
        setText('card-voltage', data.Voltage);
        setText('card-current-amp', data.Current_AMP);
        setText('card-fla', data.FLA);
        setText('card-rpm', data.RPM);

        // Physical Specs
        setText('card-manfc', data.MANFC);
        setText('card-type', data.TYPE);
        setText('card-frame', data.FRAME);
        setText('card-de-bearing', data.DE_BEARING);
        setText('card-nde-bearing', data.NDE_BEARING);
        setText('card-mounting-type', data.MOUNTING_TYPE);

        // Cabling
        setText('card-power-cable', data.POWER_CABLE);
        setText('card-field-control-cable', data.FIELD_CONTROL_CABLE);
        setText('card-rtd-cable', data.RTD_CABLE);
        setText('card-heater-cable', data.HEATER_CABLE);
        setText('card-estimated-length', data.Estimated_length);

        // Service History
        setText('card-replace-time-1', data.Replace_Time_1);
        setText('card-replace-time-2', data.Replace_Time_2);
        setText('card-replace-time-3', data.Replace_Time_3);
        setText('card-replace-time-4', data.Replace_Time_4);
        setText('card-replace-time-5', data.Replace_Time_5);
        setText('card-replace-time-6', data.Replace_Time_6);

        // Asset Information
        setText('card-warehouse-mot-no', data.Warehouse_MOT_NO);
        setText('card-apc-erp-asset-no', data.APC_ERP_ASSET_No);
        setText('card-note', data.NOTE);
    }

    closeButton.addEventListener('click', () => {
        card.classList.add('hidden');
    });
});