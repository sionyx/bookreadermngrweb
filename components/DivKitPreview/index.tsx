/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'react';
import { Button, ButtonGroup, Card, Container, Stack, Form, Modal, Image } from 'react-bootstrap';
import { MyDivKit as DivKit, DivKitVariables } from './MyDivKit';

interface IPreviewProps {
  full_screen: boolean
  div_json: any
  onUrlClick: (url: string) => void
}

enum ScreenSize {
  small = 'S',
  medium = 'M',
  large = 'L'
}

interface IPreviewState {
  screen: ScreenSize
  tabletShow: boolean
  error?: Error;
}

interface IVariable {
  type: string
  name: string
  value: any
}
  
export class DivKitPreview extends Component<IPreviewProps, IPreviewState> {
  state = {
    screen: ScreenSize.medium,
    tabletShow: false,
    error: undefined
  }

  logs = [] as string[];

  onUrlClick = (action: any) => {
    const url = action.url as string;
    this.props.onUrlClick(url);
    console.log(url);
  }

  onStat = (details: any) => {
    console.log(details);

    const url = new URL(details.action.url)
    console.log(url);
    if (url.protocol == 'div-action:') {
      if (url.host == 'analytics') {
        this.appendLog(`[Event] ${url.searchParams.get('area')}_${url.searchParams.get('tags')} ${url.searchParams.get('params')}`)
      }  
      else if (url.host == 'close') {
        this.appendLog(`[Action] Close`)
        this.setState({ tabletShow: false })
      }  
    }
    else {
      if (details.type == 'click') {
        this.onUrlClick(details.action)
      }
    }
  }

  appendLog(line: string) {
    this.logs.push(line)
    console.log(this.logs)

    const logselement = document.getElementById('logs_display') as HTMLInputElement;
    if (logselement) {
      logselement.value = this.logs.join('\n');
    }
  }

  onError = (e: any) => {
    const error = e.error as Error;
    if (error.message == 'Missing card') return;
    
    console.log(error);

    //this.appendLog(`[Error] ${error.message}`)
  }

  showError(error: Error) {
    this.setState({ error: error })
  }

  getSizes = (size: ScreenSize, isTablet: boolean) => {
    const topMargin = 50

    if (isTablet) {
      return { 
        width: 1024, 
        height: 768 - (this.props.full_screen ? 0 : topMargin),
        marginTop: (this.props.full_screen ? 0 : topMargin),
        borderRadius: this.props.full_screen ? "0" : "16px 16px 0 0"
      }
    }

    switch (size) {
      case ScreenSize.small: return { 
        width: 375, 
        height: 667 - (this.props.full_screen ? 0 : topMargin),
        marginTop: (this.props.full_screen ? 0 : topMargin),
        borderRadius: this.props.full_screen ? "0" : "16px 16px 0 0"
      }; // iPhone SE2
      case ScreenSize.medium: return { 
        width: 393, 
        height: 852 - (this.props.full_screen ? 0 : topMargin), 
        marginTop: (this.props.full_screen ? 0 : topMargin),
        borderRadius: this.props.full_screen ? "0" : "16px 16px 0 0"
      }; // iPhone 15
      case ScreenSize.large: return { 
        width: 430, 
        height: 932 - (this.props.full_screen ? 0 : topMargin),
        marginTop: (this.props.full_screen ? 0 : topMargin),
        borderRadius: this.props.full_screen ? "0" : "16px 16px 0 0"
      }; // iPhone 15 Pro Max
    }
  }

  getVariables = (size: ScreenSize, isTablet: boolean) => {
    const sizes = this.getSizes(size, isTablet)

    return {
      screen_width: sizes.width,
      screen_height: sizes.height,
      safearea_top: sizes.marginTop,
      safearea_bottom: 0,
      is_landscape: false,
      is_tablet: isTablet
    } as DivKitVariables
  }

  removeVariablesFromDivJson = (divjson: any) => {
    const root = divjson['card']
    if (!root) { return divjson }

    const vars = root['variables'] as IVariable[]
    if (!vars) { return divjson }

    const vars_to_exclude = ['screen_width', 'screen_height', 'is_iPad']
    const cleared_vars = vars.filter(v => !vars_to_exclude.includes(v.name) )
    root['variables'] = cleared_vars
    return divjson
  }

  render() {
    this.logs = [] as string[];

    return (
      <>
      <Card className="sticky-top">
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            Просмотр
            <Button className="ms-auto" 
              size="sm"
              key='size_key_tablet'
              variant='secondary'
              onClick={ () => this.setState({ tabletShow: true }) }>
              Tablet
            </Button>            
            <ButtonGroup size="sm">
              { Object.entries(ScreenSize).map(([key, value]) => {
                const size: ScreenSize = ScreenSize[key as keyof typeof ScreenSize];
                return (
                  <Button 
                    key={ 'size_key_' + value }
                    variant={ this.state.screen == size ? 'primary' : 'secondary' } 
                    onClick={ () => this.setState({...this.state, screen: size}) }>
                      { value }
                  </Button>
                )
              })}
            </ButtonGroup>
          </Stack>
        </Card.Header>
        <Card.Body className="p-0 bg-black">
          <Container className="border border-primary overflow-auto p-0 bg-white" style={ this.getSizes(this.state.screen, false) }>
            <DivKit id="divkit"
              json={ this.removeVariablesFromDivJson(this.props.div_json) } 
              variables = { this.getVariables(this.state.screen, false) }
              platform='touch' 
              builtinProtocols={ [] } 
              onStat={ this.onStat }
              onError={ (e: any) => this.onError(e) } />
          </Container>
        </Card.Body>
        <Card.Footer className="text-muted p-0">
          <Form.Control 
                id='logs_display'
                size="sm" 
                readOnly
                plaintext
                className='font-monospace p-1 text-white bg-dark'
                as="textarea" 
                rows={3} 
                  />
        </Card.Footer>
      </Card>
          <Modal fullscreen={ true } show={ this.state.tabletShow } onHide={ () => this.setState({ tabletShow: false }) }>
          <Modal.Header closeButton>
            <Modal.Title>Планшет</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="overflow-auto border px-0" style={{ width: 1024, height: 768, marginTop: 50 }} >
              <Image className='position-absolute' src='https://divkit-constructor.hb.ru-msk.vkcloud-storage.ru/ipad-air.png' style={{ width: 1248, height: 887, transform: `translate(-116px, -59px)` }} alt='' />
              <Container className="overflow-auto px-0 pb-0 bg-white" style={ this.getSizes(this.state.screen, true) } >
                <DivKit 
                  id="divkit-tables"
                  json={ this.removeVariablesFromDivJson(this.props.div_json) } 
                  variables = { this.getVariables(this.state.screen, true) }
                  platform='touch' 
                  builtinProtocols={ [] } 
                  onStat={ this.onStat }
                  onError={ (e: any) => this.onError(e) } />
              </Container>
            </Container>
          </Modal.Body>
        </Modal>
        </>
    )
  }
}
