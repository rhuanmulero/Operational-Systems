        // Variáveis e funções para o sistema monotarefa
        let programaMonotarefaEmExecucao = false;
        let tempoMonotarefaInicial;
        let tempoMonotarefaDecorridoInterval;
        let progressoMonotarefaInterval;

        function executarProgramaMonotarefa(numeroPrograma) {
            if (programaMonotarefaEmExecucao) {
                alert('Aguarde o programa atual terminar antes de iniciar outro.');
                return;
            }

            if (parseFloat(document.getElementById('progressMonotarefa').style.width) !== 0) {
                alert('Aguarde a barra de progresso voltar ao zero antes de iniciar um novo programa.');
                return;
            }

            programaMonotarefaEmExecucao = true;
            document.getElementById('statusMonotarefa').innerText = 'Executando programa ' + numeroPrograma + '...';
            tempoMonotarefaInicial = Date.now();
            document.getElementById('progressMonotarefa').style.width = '0%';

            let tempoTotalMonotarefa = 10000;
            let progressoMonotarefa = 0;
            let intervaloMonotarefa = 100;
            let incrementoMonotarefa = (intervaloMonotarefa / tempoTotalMonotarefa) * 100;
            progressoMonotarefaInterval = setInterval(function() {
                progressoMonotarefa += incrementoMonotarefa;
                document.getElementById('progressMonotarefa').style.width = progressoMonotarefa + '%';
                if (progressoMonotarefa > 100) {
                    clearInterval(progressoMonotarefaInterval);
                    document.getElementById('statusMonotarefa').innerText = 'Programa ' + numeroPrograma + ' concluído.';
                    programaMonotarefaEmExecucao = false;
                    clearInterval(tempoMonotarefaDecorridoInterval);
                    document.getElementById('progressMonotarefa').style.width = '0%';
                }
            }, intervaloMonotarefa);

            tempoMonotarefaDecorridoInterval = setInterval(atualizarTempoDecorridoMonotarefa, 1000);
        }

        function cancelarProgramaMonotarefa() {
            if (!programaMonotarefaEmExecucao) {
                alert('Nenhum programa em execução para cancelar.');
                return;
            }

            clearInterval(progressoMonotarefaInterval);
            clearInterval(tempoMonotarefaDecorridoInterval);
            document.getElementById('statusMonotarefa').innerText = 'Programa cancelado.';
            programaMonotarefaEmExecucao = false;
            document.getElementById('progressMonotarefa').style.width = '0%';
        }

        function atualizarTempoDecorridoMonotarefa() {
            const tempoAtualMonotarefa = Date.now();
            const tempoDecorridoMonotarefa = Math.floor((tempoAtualMonotarefa - tempoMonotarefaInicial) / 1000);
            document.getElementById('tempoDecorridoMonotarefa').innerText = 'Tempo decorrido: ' + tempoDecorridoMonotarefa + ' segundos';
        }

        // Variáveis e funções para o sistema multitarefa

        async function executarPrograma(nomePrograma, progressBarId, programId) {
            const tempoExecucao = Math.floor(Math.random() * 5000) + 1000; 
            const progressBar = document.getElementById(progressBarId);
            const programaText = document.getElementById(programId);

            for (let progresso = 0; progresso <= 100; progresso += 5) {
                await new Promise(resolve => setTimeout(resolve, tempoExecucao / 20));
                progressBar.style.width = `${progresso}%`;
                if (progresso === 100) {
                    programaText.innerHTML += ' - concluído';
                }
            }
        }

        async function executarProgramas() {
            const programas = [
                { nome: 'Programa 1', progressBarId: 'progressBar1', programId: 'program1' },
                { nome: 'Programa 2', progressBarId: 'progressBar2', programId: 'program2' },
                { nome: 'Programa 3', progressBarId: 'progressBar3', programId: 'program3' }
            ];
            const output = document.getElementById('output');
            output.innerHTML = '';

            try {
                const resultados = await Promise.all(programas.map(programa => executarPrograma(programa.nome, programa.progressBarId, programa.programId)));
                output.innerHTML = '<p>Todos os programas foram concluídos.</p>';
            } catch (error) {
                output.innerHTML = '<p>Execução cancelada.</p>';
            }
        }

        function cancelarExecucao() {
            throw new Error('Execução cancelada.');
        }

        // Variáveis e funções para o sistema multi-processador

        class Processador {
            constructor(numero) {
                this.numero = numero;
                this.programaAtual = null;
            }

            executarPrograma(programa, progressBarId) {
                this.programaAtual = programa;
                const progressBar = document.getElementById(progressBarId);
                progressBar.style.width = '0%';
                const interval = 1000;
                const incremento = (interval / programa.tempo) * 100;
                const progressInterval = setInterval(() => {
                    progressBar.style.width = (parseFloat(progressBar.style.width) + incremento) + '%';
                    if (parseFloat(progressBar.style.width) >= 100) {
                        clearInterval(progressInterval);
                        this.output(`Processador ${this.numero} concluiu ${programa.nome}.`);
                        this.programaAtual = null;
                    }
                }, interval);
            }

            output(message) {
                const outputDiv = document.getElementById('outputMultiprocessadores');
                outputDiv.innerHTML += `<p>${message}</p>`;
            }
        }

        class Programa {
            constructor(nome, tempo) {
                this.nome = nome;
                this.tempo = tempo;
            }
        }

        let processador1, processador2, processador3;
        let programa1, programa2, programa3;

        function iniciarExecucao() {
            if (!processador1 || !processador2 || !processador3) {
                processador1 = new Processador(1);
                processador2 = new Processador(2);
                processador3 = new Processador(3);

                programa1 = new Programa('Programa 1', 10000);
                programa2 = new Programa('Programa 2', 10000);
                programa3 = new Programa('Programa 3', 10000);

                processador1.executarPrograma(programa1, 'progresso1');
                processador2.executarPrograma(programa2, 'progresso2');
                processador3.executarPrograma(programa3, 'progresso3');
            } else {
                outputMessage('A execução já foi iniciada.');
            }
        }

        function interromperExecucao() {
            processador1 = null;
            processador2 = null;
            processador3 = null;
            outputMessage('Execução interrompida.');
            resetProgressBars();
        }

        function reiniciarSistema() {
            processador1 = null;
            processador2 = null;
            processador3 = null;
            iniciarExecucao();
        }

        function resetProgressBars() {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(progressBar => {
                progressBar.style.width = '0%';
            });
        }

        function outputMessage(message) {
            const outputDiv = document.getElementById('outputMultiprocessadores');
            outputDiv.innerHTML += `<p>${message}</p>`;
        }