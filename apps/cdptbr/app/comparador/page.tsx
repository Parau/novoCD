'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import { Container, Paper, Box, Text, Breadcrumbs, Anchor } from '@mantine/core';
import { IconHomeFilled } from '@tabler/icons-react';

// --- Componente Principal da Página ---
export default function PaginaComparador() {
  // Textos iniciais para demonstração
  const textoInicialEsquerda = `Bem-vindo ao comparador de textos!
Cole aqui a versão original do seu texto.`;

  const textoInicialDireita = `Bem-vindo ao comparador de textos!
Cole aqui a versão editada do seu texto.`;

  const [scriptsLoaded, setScriptsLoaded] = useState({ codemirror: false, mergely: false });
  const [alturaEditor, setAlturaEditor] = useState(600);

  // Estados para armazenar o texto atual de cada lado
  const [textoEsquerda, setTextoEsquerda] = useState(textoInicialEsquerda);
  const [textoDireita, setTextoDireita] = useState(textoInicialDireita);

  useEffect(() => {
    // Atualiza a altura para 90% da altura da janela
    const atualizarAltura = () => setAlturaEditor(window.innerHeight * 0.9);

    atualizarAltura();
    window.addEventListener('resize', atualizarAltura);
    return () => window.removeEventListener('resize', atualizarAltura);
  }, []);

  const handleCodeMirrorLoad = () => {
    setScriptsLoaded(prev => ({ ...prev, codemirror: true }));
  };

  const handleMergelyLoad = () => {
    setScriptsLoaded(prev => ({ ...prev, mergely: true }));
  };

  return (
    <>
      {/* Scripts com strategy afterInteractive para evitar warnings de preload */}
      <Script
        src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js"
        strategy="afterInteractive"
        onLoad={handleCodeMirrorLoad}
        onError={(e) => console.error('Erro ao carregar CodeMirror:', e)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mergely@5.1.2/lib/mergely.js"
        strategy="afterInteractive"
        onLoad={handleMergelyLoad}
        onError={(e) => console.error('Erro ao carregar Mergely:', e)}
      />

      <Container size="2xl" px="md" py="xl" style={{ minHeight: '100vh', background: '#ffffffff' }}>


        {/* Adicionando o CSS do Mergely via link */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/mergely@5.1.2/lib/mergely.css"
        />

        {/* O componente Mergely é renderizado aqui */}
        <Paper >
          <MergelyEditor
            textoEsquerda={textoEsquerda}
            textoDireita={textoDireita}
            setTextoEsquerda={setTextoEsquerda}
            setTextoDireita={setTextoDireita}
            scriptsLoaded={scriptsLoaded}
            altura={alturaEditor}
          />
        </Paper>

        <Text ta="center" mt="xl" fz="sm" c="gray">
          Caso não tenha acesso a um comparador de textos ou esteja preocupado com a privacidade das informações, disponibilizei esta ferramenta. Ela permite visualizar as alterações feitas por uma IA em revisões de texto, sem coletar ou armazenar nenhum dado inserido.
        </Text>
      </Container>
    </>
  );
}

// --- Componente do Editor Mergely ---
interface MergelyEditorProps {
  textoEsquerda: string;
  textoDireita: string;
  setTextoEsquerda: (v: string) => void;
  setTextoDireita: (v: string) => void;
  scriptsLoaded: { codemirror: boolean; mergely: boolean };
  altura?: number; // nova prop opcional
}

function MergelyEditor({
  textoEsquerda,
  textoDireita,
  setTextoEsquerda,
  setTextoDireita,
  scriptsLoaded,
  altura = 500,
}: MergelyEditorProps) {
  const mergelyRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [isMergelyLoaded, setIsMergelyLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Efeito para verificar se os scripts foram carregados na window
  useEffect(() => {
    if (scriptsLoaded.codemirror && scriptsLoaded.mergely) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).Mergely && (window as any).CodeMirror) {
          setIsMergelyLoaded(true);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded]);

  // Efeito para inicializar o Mergely apenas uma vez
  useEffect(() => {
    if (isMergelyLoaded && mergelyRef.current && !isInitialized) {
      try {
        // Limpa o container
        mergelyRef.current.innerHTML = '';
        
        // Garante que sempre temos strings válidas com verificações extras
        const leftText = (textoEsquerda !== null && textoEsquerda !== undefined) ? String(textoEsquerda) : '';
        const rightText = (textoDireita !== null && textoDireita !== undefined) ? String(textoDireita) : '';

        //console.log('Inicializando Mergely com:', { leftText, rightText }); // Debug

        const mergelyInstance = new (window as any).Mergely(mergelyRef.current, {
          height: altura,
          width: 'auto',
          sidebar: true,
          wrap_lines: true,
          line_numbers: true,
          edit_left: true,
          edit_right: true,
          diff_type: 'word', 
          cmsettings: {
            readOnly: false,
            lineNumbers: true,
            mode: 'text/plain',
            theme: 'default',
          },
          lhs: function(setValue: (value: string) => void) {
            // Verificação adicional antes de chamar setValue
            const safeValue = leftText || '';
            //console.log('Setting left text:', safeValue); // Debug
            setValue(safeValue);
          },
          rhs: function(setValue: (value: string) => void) {
            // Verificação adicional antes de chamar setValue
            const safeValue = rightText || '';
            //console.log('Setting right text:', safeValue); // Debug
            setValue(safeValue);
          },
        });

        // Aguarda um pouco antes de adicionar os listeners
        setTimeout(() => {
          try {
            // Verifica se as instâncias estão prontas antes de adicionar listeners
            if (mergelyInstance.lhs && mergelyInstance.rhs && 
                typeof mergelyInstance.lhs === 'function' && 
                typeof mergelyInstance.rhs === 'function') {
              
              const leftEditor = mergelyInstance.lhs();
              const rightEditor = mergelyInstance.rhs();
              
              // Verifica se os editores estão prontos
              if (leftEditor && rightEditor && 
                  typeof leftEditor.on === 'function' && 
                  typeof rightEditor.on === 'function') {
                
                //console.log('Adicionando listeners...'); // Debug
                
                leftEditor.on('change', (cm: any) => {
                  const value = cm.getValue();
                  setTextoEsquerda(value || '');
                });
                
                rightEditor.on('change', (cm: any) => {
                  const value = cm.getValue();
                  setTextoDireita(value || '');
                });
                
                //console.log('Listeners adicionados com sucesso!'); // Debug
              } else {
                console.warn('Editores ainda não estão prontos');
              }
            } else {
              console.warn('Mergely ainda não está pronto para listeners');
            }
          } catch (listenerError) {
            console.warn('Erro ao adicionar listeners:', listenerError);
          }
        }, 300); // Aumentei o timeout para 300ms

        instanceRef.current = mergelyInstance;
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar Mergely:', error);
        // Reset para tentar novamente se necessário
        setIsInitialized(false);
      }
    }

    return () => {
      if (instanceRef.current && !isMergelyLoaded) {
        try {
          if (typeof instanceRef.current.destroy === 'function') {
            instanceRef.current.destroy();
          }
          instanceRef.current = null;
          setIsInitialized(false);
        } catch (error) {
          console.warn('Erro ao destruir instância:', error);
        }
      }
    };
  }, [isMergelyLoaded, textoEsquerda, textoDireita]);

  // Efeito separado para redimensionar apenas
  useEffect(() => {
    if (instanceRef.current && isInitialized) {
      try {
        // Atualiza apenas a altura do container
        if (mergelyRef.current) {
          mergelyRef.current.style.height = `${altura}px`;
        }
        // Força o refresh do mergely
        if (typeof instanceRef.current.resize === 'function') {
          instanceRef.current.resize();
        }
      } catch (error) {
        console.warn('Erro ao redimensionar:', error);
      }
    }
  }, [altura, isInitialized]);

  return (
    <>
    <Breadcrumbs separator=">" separatorMargin="xs" mt={0} mb="xs">
      <Anchor href="/">
        <IconHomeFilled size={18} color="black" />
      </Anchor>
      <Anchor href="/ia">Inteligência Artificial</Anchor>
    </Breadcrumbs>
    <Box
      ref={mergelyRef}
      style={{
        height: altura,
        minHeight: altura,
        width: '100%',
        //border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {!isMergelyLoaded && (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: altura,
            background: '#f3f4f6',
          }}
        >
          <Text c="dimmed">
            Carregando o editor...
            {!scriptsLoaded.codemirror && ' (CodeMirror)'}
            {!scriptsLoaded.mergely && ' (Mergely)'}
          </Text>
        </Box>
      )}
    </Box>
    </>
  );
}
