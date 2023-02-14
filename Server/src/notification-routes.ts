import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const publicKey =
  'BAf_cBoi-0d0dQI9ShJXRSTi6KNGWB7hji48zsxlQ6Y4B-jv-J_2v_rBuc-tRteilb8X3vgAJ77mz3JSIlVopcw'
const privateKey = 'cKrNiAPZ64peP2-wZh1O6oQk_2t4D4AdeyzSTHJ5LRo'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {publicKey}
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)

    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'hello do backend')
    }, 5000)

    return reply.status(201).send()
  })
}
